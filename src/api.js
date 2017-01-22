class Api {
  constructor(ws) {
    this._ws = ws
  }

  async enterRoom(userDetails) {
    this._ws.send(JSON.stringify({ action: 'enterRoom', userDetails }))
  }
}

module.exports = Api
