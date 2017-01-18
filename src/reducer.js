const {
  RECEIVE_EVENT,
  SET_USER_DETAILS
} = require('./actions')

const initialState = {
  events: [],
  userDetails: JSON.parse(localStorage.getItem('userDetails') || 'null')
}

module.exports = function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_EVENT:
      return Object.assign({}, state, { events: state.events.concat([action.event]) })

    case SET_USER_DETAILS:
      return Object.assign({}, state, { userDetails: { email: action.email } })

    default:
      return state
  }
}
