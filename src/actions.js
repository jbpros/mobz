const INITIALIZE_API = 'initialize-api'
const CLOSE_API = 'close-api'
const RECEIVE_EVENT = 'receive-event'
const SET_USER_DETAILS = 'set-user-details' // TODO: rename to SET_OWN_DETAILS?
const SET_USER_STATUS = 'set-user-status'
const TOGGLE_ATTENDEE_ATTENTION = 'toggle-attendee-attention'

const receiveEventActionType = type => `${RECEIVE_EVENT}:${type}`

module.exports = {
  INITIALIZE_API,
  initializeApi: api => ({
    type: INITIALIZE_API,
    api
  }),

  CLOSE_API,
  closeApi: () => ({ type: CLOSE_API }),

  RECEIVE_EVENT,
  receiveEvent: event => ({
    type: receiveEventActionType(event.type),
    event
  }),

  receiveEventActionType,

  SET_USER_DETAILS,
  setUserDetails: userDetails => ({
    type: SET_USER_DETAILS,
    userDetails
  }),

  SET_USER_STATUS,
  setUserStatus: ({ email, status }) => ({
    type: SET_USER_STATUS,
    email,
    status
  }),

  TOGGLE_ATTENDEE_ATTENTION,
  toggleUserAttention: ({ email }) => ({
    type: TOGGLE_ATTENDEE_ATTENTION,
    email
  })
}
