const http = require('http')
const Stream = require('stream')
const EventEmitter = require('events')
const Websocket = require('ws')
const {
  PINGED,
  USER_ENTERED_ROOM,
  USER_LEFT_ROOM,
  USER_STATUS_SET,
  USER_STARTED_PAYING_ATTENTION,
  USER_STOPPED_PAYING_ATTENTION
} = require('./src/events')
const {
  ENTER_ROOM,
  SET_USER_STATUS,
  START_PAYING_ATTENTION,
  STOP_PAYING_ATTENTION
} = require('./src/commands')

class WebSocketSendStream extends Stream.Writable {
  constructor(ws) {
    super({ objectMode: true })
    this._ws = ws
  }

  _write(object, _, cb) {
    try {
      this._ws.send(JSON.stringify(object))
      cb()
    } catch (err) {
      cb(err)
    }
  }
}

// TODO: merge array and semaphore into a list emitting events on new items appended
const arrayToStream = (array, semaphore) => {
  let cursor = -1
  let signalListener = null

  const stream = new Stream.Readable({
    objectMode: true,
    read: function () {
      const next = array[++cursor] || null
      if (next) {
        this.push(next)
      } else {
        signalListener = () => {
          signalListener = null
          this.push(array[cursor])
        }
        semaphore.once('signal', signalListener)
      }
    }
  })
  stream.end = () => {
    if (signalListener)
      semaphore.removeListener('signal', signalListener)
    stream.push(null)
  }
  return stream
}

class Semaphore extends EventEmitter {
  signal() {
    this.emit('signal')
  }
}

const semaphore = new Semaphore()

function publishEvent(type, payload = {}) {
  if (!type) throw new Error('Missing event type')
  const event = Object.assign({ type, payload }, { timestamp: Date.now() })
  events.push(event)
  semaphore.signal()
}

const events = []

publishEvent(PINGED)

// setInterval(() => publishEvent(PINGED), 10000)

const server = http.createServer()

server.listen(8080, '127.0.0.1', () => {
  const wss = Websocket.Server({ server })
  wss.on('connection', ws => {
    const wsStream = new WebSocketSendStream(ws)
    let userDetails


    const eventStream = arrayToStream(events, semaphore)
    eventStream
      .pipe(wsStream, { end: false })

    ws.on('message', message => {
      const command = JSON.parse(message)
      switch (command.name) {
        case ENTER_ROOM: {
          userDetails = command.payload.userDetails
          return publishEvent(USER_ENTERED_ROOM, {
            deviceId: userDetails.deviceId,
            email: userDetails.email
          })
        }

        case SET_USER_STATUS: {
          const { email, status } = command.payload
          return publishEvent(USER_STATUS_SET, { email, status })
        }

        case START_PAYING_ATTENTION: {
          const { email } = command.payload
          return publishEvent(USER_STARTED_PAYING_ATTENTION, { email })
        }

        case STOP_PAYING_ATTENTION: {
          const { email } = command.payload
          return publishEvent(USER_STOPPED_PAYING_ATTENTION, { email })
        }

        default: {
          console.error("Unknown message:", JSON.stringify(message, null, 2))
        }
      }
    })

    ws.once('close', () => {
      eventStream.end()
      eventStream.unpipe(wsStream)
      if (userDetails)
        publishEvent(USER_LEFT_ROOM, {
          deviceId: userDetails.deviceId,
          email: userDetails.email
        })
    })

    ws.on('error', err => {
      console.err("Error on WebSocket connection:", JSON.stringify(err, null, 2))
    })
  })
})
