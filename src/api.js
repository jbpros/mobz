const {
  ENTER_ROOM
} = require('./commands')

class Api {
  constructor(ws) {
    this._ws = ws
  }

  _sendCommand(name, payload) {
    this._ws.send(JSON.stringify({ name, payload }))
  }

  async enterRoom(userDetails) {
    this._sendCommand(ENTER_ROOM, { userDetails })
  }
}

module.exports = Api
