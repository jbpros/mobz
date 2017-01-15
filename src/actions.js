const SET_USER_DETAILS = 'set-user-details'

module.exports = {
  SET_USER_DETAILS,
  setUserDetails: ({ email }) => ({
    type: SET_USER_DETAILS,
    email
  })
}
