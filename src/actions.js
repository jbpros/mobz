const INITIALIZE_API = 'initialize-api'
const RECEIVE_EVENT = 'receive-event'
const SET_USER_DETAILS = 'set-user-details'

const receiveEventActionType = type => `${RECEIVE_EVENT}:${type}`

module.exports = {
  INITIALIZE_API,
  initializeApi: api => ({
    type: INITIALIZE_API,
    api
  }),

  RECEIVE_EVENT,
  receiveEvent: event => ({
    type: receiveEventActionType(event.type),
    event
  }),

  receiveEventActionType,

  SET_USER_DETAILS,
  setUserDetails: (userDetails) => ({
    type: SET_USER_DETAILS,
    userDetails
  })
}
