const http = require('http')
const Stream = require('stream')
const Websocket = require('ws')
const {
  PINGED
} = require('./src/events')

class WebSocketSendStream extends Stream.Writable {
  constructor(ws) {
    super({ objectMode: true })
    this._ws = ws
  }

  _write(object, _, cb) {
    this._ws.send(JSON.stringify(object))
    cb()
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

setInterval(() => publishEvent(PINGED, { timestamp: Date.now() }), 1000)

const server = http.createServer()

server.listen(8080, '127.0.0.1', () => {
  const wss = Websocket.Server({ server })
  wss.on('connection', ws => {
    console.log('hi!')
    const wsStream = new WebSocketSendStream(ws)
    arrayToStream(events)
      // after catching up with previous events,
      // start broadcasting live events:
      .on('end', () => broadcastStream.pipe(wsStream))
      .pipe(wsStream, { end: false })

    ws.on('message', message => {
      const data = JSON.parse(message)
      console.log("MSG", JSON.stringify(data, null, 2))
    })

    ws.on('close', () => {
      console.log('bye!')
      broadcastStream.unpipe(wsStream)
    })
  })
})
