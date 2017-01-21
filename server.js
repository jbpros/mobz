const SSE = require('sse')
const http = require('http')
const Stream = require('stream')
const Koa = require('koa')
const koaRouter = require('koa-router')
const jsonBody = require('koa-json-body')
const {
  PINGED,
  USER_ENTERED_ROOM
} = require('./src/events')

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

const events = []

function publishEvent(type, payload) {
  const event = { type, payload }
  events.push(event)
  broadcastStream.write(event)
}

const broadcastStream = new Stream.PassThrough({ objectMode: true })

setInterval(() => publishEvent(PINGED, { timestamp: Date.now() }), 1000)

const app = new Koa()
const router = koaRouter()
router.post('/room-attendances', jsonBody(), ctx => {
  const { userDetails } = ctx.request.body
  publishEvent(USER_ENTERED_ROOM, { userDetails })
  ctx.body = { ok: true }
})
app.use(router.routes())
app.use(router.allowedMethods())

const server = http.createServer(app.callback())

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
