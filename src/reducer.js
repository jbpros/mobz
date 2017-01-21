const { combineReducers } = require('redux')
const {
  receiveEventActionType,
  RECEIVE_EVENT,
  SET_USER_DETAILS
} = require('./actions')
const {
  USER_ENTERED_ROOM
} = require('./events')

const events = (state = [], action) => {
  if (action.type.indexOf(`${RECEIVE_EVENT}:`) === 0)
    return state.concat([action.event])
  return state
}

const roomAttendees = (state = {}, action) => {
  switch (action.type) {
    case receiveEventActionType(USER_ENTERED_ROOM): {
      const { userDetails } = action.event.payload
      return Object.assign({}, state, { [userDetails.email]: userDetails })
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
