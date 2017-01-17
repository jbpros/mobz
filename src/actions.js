const RECEIVE_EVENT = 'receive-event'
const SET_USER_DETAILS = 'set-user-details'

module.exports = {
  RECEIVE_EVENT,
  receiveEvent: event => ({
    type: RECEIVE_EVENT,
    event
  }),

  SET_USER_DETAILS,
  setUserDetails: ({ email }) => ({
    type: SET_USER_DETAILS,
    email
  })
}
