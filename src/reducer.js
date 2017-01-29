const { combineReducers } = require('redux')
const {
  receiveEventActionType,
  INITIALIZE_API,
  RECEIVE_EVENT,
  SET_USER_DETAILS
} = require('./actions')
const {
  USER_ENTERED_ROOM,
  USER_LEFT_ROOM
} = require('./events')

const events = (state = [], action) => {
  if (action.type === INITIALIZE_API)
    return []
  else if (action.type.indexOf(`${RECEIVE_EVENT}:`) === 0)
    return state.concat([action.event])
  return state
}

const roomAttendees = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_API: {
      return {}
    }

    case receiveEventActionType(USER_ENTERED_ROOM): {
      const { userDetails } = action.event.payload
      return Object.assign({}, state, { [userDetails.email]: userDetails })
    }

    case receiveEventActionType(USER_LEFT_ROOM): {
      const { userDetails: { email } } = action.event.payload
      state = Object.assign({}, state)
      delete state[email]
      return state
    }

    default:
      return state
  }
}

const userDetails = (state = null, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return action.userDetails

    default:
      return state
  }
}

module.exports = combineReducers({
  events,
  roomAttendees,
  userDetails
})
