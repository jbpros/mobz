const api = {
  enterRoom: async (userDetails) => {
    const response = await fetch('http://127.0.0.1:8080/room-attendances', {
      method: "POST",
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ userDetails })
    })
    const resData = await response.json()
    if (!resData.ok)
      throw new Error(`Unexpected response when entering room: ${JSON.stringify(resData, null, 2)}`)
  }
}

module.exports = api
