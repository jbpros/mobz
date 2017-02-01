exports.pickUserDetails = state => state.userDetails
exports.hasUserDetails = state => !!state.userDetails

exports.pickAllEvents = state => state.events

exports.pickRoomAttendees = state => {
  const userDetailsByEmail = Object.values(state.roomAttendees)
    .reduce((attendees, userDetails) =>
      Object.assign({}, attendees, { [userDetails.email]: userDetails }), {}
    )
  return Object.values(userDetailsByEmail)
}
