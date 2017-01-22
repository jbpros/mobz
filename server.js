const http = require('http')
const Stream = require('stream')
const Websocket = require('ws')
const {
  PINGED,
  USER_ENTERED_ROOM,
  USER_LEFT_ROOM
} = require('./src/events')
const {
  ENTER_ROOM
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

const arrayToStream = (array) => {
  let cursor = 0
  return new Stream.Readable({
    objectMode: true,
    read: function () {
      this.push(array[cursor++] || null)
    }
  })
}

const broadcastStream = new Stream.PassThrough({ objectMode: true })

function publishEvent(type, payload) {
  const event = { type, payload }
  events.push(event)
  broadcastStream.write(event)
}

const events = []

publishEvent(PINGED, { timestamp: Date.now() })

setInterval(() => publishEvent(PINGED, { timestamp: Date.now() }), 10000)

const server = http.createServer()

server.listen(8080, '127.0.0.1', () => {
  const wss = Websocket.Server({ server })
  wss.on('connection', ws => {
    const wsStream = new WebSocketSendStream(ws)
    let userDetails

    arrayToStream(events)
      // after catching up with previous events,
      // start broadcasting live events:
      .on('end', () => broadcastStream.pipe(wsStream))
      .pipe(wsStream, { end: false })

    ws.on('message', message => {
      const command = JSON.parse(message)
      switch (command.name) {
        case ENTER_ROOM: {
          userDetails = command.payload.userDetails
          return publishEvent(USER_ENTERED_ROOM, { userDetails })
        }
      }
    })

    ws.on('close', () => {
      broadcastStream.unpipe(wsStream)
      if (userDetails)
        publishEvent(USER_LEFT_ROOM, { userDetails })
    })

    ws.on('error', err => {
      console.err("Error on WebSocket connection:", JSON.stringify(err, null, 2))
    })
  })
})
