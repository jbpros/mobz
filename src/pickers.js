exports.pickApiStatus = state => state.apiStatus

exports.pickUserDetails = state => state.userDetails
exports.hasUserDetails = state => !!state.userDetails

exports.pickAllEvents = state => state.events

exports.pickRoomAttendees = state => Object.values(state.roomAttendees || {})
