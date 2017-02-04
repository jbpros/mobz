const { combineReducers } = require('redux')
const {
  receiveEventActionType,
  INITIALIZE_API,
  RECEIVE_EVENT,
  SET_USER_DETAILS
} = require('./actions')
const {
  USER_ENTERED_ROOM,
  USER_LEFT_ROOM,
  USER_STARTED_PAYING_ATTENTION,
  USER_STOPPED_PAYING_ATTENTION
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
      const { deviceId, email } = action.event.payload
      const attendee = state[email] || {
        email,
        deviceIds: [],
        isPayingAttention: true
      }
      const updatedAttendee = Object.assign({}, attendee, {
        deviceIds: attendee.deviceIds.concat([deviceId])
      })
      state = Object.assign({}, state, { [email]: updatedAttendee })
      return state
    }

    case receiveEventActionType(USER_STARTED_PAYING_ATTENTION): {
      const { email } = action.event.payload
      const attendee = state[email]
      const updatedAttendee = Object.assign({}, attendee, { isPayingAttention: true })
      return Object.assign({}, state, { [email]: updatedAttendee })
    }

    case receiveEventActionType(USER_STOPPED_PAYING_ATTENTION): {
      const { email } = action.event.payload
      const attendee = state[email]
      const updatedAttendee = Object.assign({}, attendee, { isPayingAttention: false })
      return Object.assign({}, state, { [email]: updatedAttendee })
    }

    case receiveEventActionType(USER_LEFT_ROOM): {
      const { deviceId, email } = action.event.payload
      const attendee = state[email]
      const updatedAttendee = Object.assign({}, attendee, {
        deviceIds: attendee.deviceIds.filter(id => id != deviceId)
      })
      if (updatedAttendee.deviceIds.length > 0) {
        state = Object.assign({}, state, { [email]: updatedAttendee })
      } else {
        state = Object.assign({}, state)
        delete state[email]
      }
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
