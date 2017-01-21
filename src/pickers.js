exports.pickUserDetails = state => state.userDetails
exports.hasUserDetails = state => !!state.userDetails

exports.pickAllEvents = state => state.events

exports.pickRoomAttendees = state => {
  return Object.values(state.roomAttendees)
}
