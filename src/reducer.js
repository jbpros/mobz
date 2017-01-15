const {
  SET_USER_DETAILS
} = require('./actions')

const initialState = {
  userDetails: null
}

module.exports = function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return Object.assign({}, state, { userDetails: { email: action.email } })

    default:
      return state
  }
}
