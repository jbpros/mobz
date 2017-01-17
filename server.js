const SSE = require('sse')
const http = require('http')
const Stream = require('stream')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('okay')
})

class EventSourceStream extends Stream.Writable {
  constructor(client) {
    super({ objectMode: true })
    this._client = client
  }

  _write(event, _, callback) {
    this._client.send(JSON.stringify(event))
    callback()
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

const events = [
  { type: 'type1', data: 'hi' },
  { type: 'type2', data: 'there' },
  { type: 'type3', data: 'sup?' },
]

function publishEvent(event) {
  events.push(event)
  broadcastStream.write(event)
}

const broadcastStream = new Stream.PassThrough({ objectMode: true })

setInterval(() => publishEvent({ type: 'rnd', data: Date.now() }), 1000)

server.listen(8080, '127.0.0.1', () => {
  const sse = new SSE(server)
  sse.on('connection', function (client) {
    const essStream = new EventSourceStream(client)
    arrayToStream(events)
      // after catching up with previous events,
      // start broadcasting live events:
      .on('end', () => broadcastStream.pipe(essStream))
      .pipe(essStream, { end: false })

    client.on('close', () => broadcastStream.unpipe(essStream))
  })
})
