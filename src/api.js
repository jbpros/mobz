const {
  ENTER_ROOM,
  SET_USER_STATUS,
  START_PAYING_ATTENTION,
  STOP_PAYING_ATTENTION
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

  async startPayingAttention({ email }) {
    this._sendCommand(START_PAYING_ATTENTION, { email })
  }

  async stopPayingAttention({ email }) {
    this._sendCommand(STOP_PAYING_ATTENTION, { email })
  }

  async setUserStatus({ email, status }) {
    this._sendCommand(SET_USER_STATUS, { email, status })
  }
}

module.exports = Api
