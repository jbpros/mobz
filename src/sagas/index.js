import { fork } from 'redux-saga/effects'
import manageUserDetails from './manage_user_details'
import manageUserStatus from './manage_user_status'
import manageUserAttention from './manage_user_attention'

function* mainSaga() {
  yield fork(manageUserDetails)
  yield fork(manageUserStatus)
  yield fork(manageUserAttention)
}

module.exports = mainSaga
