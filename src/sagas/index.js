import { fork } from 'redux-saga/effects'
import manageUserDetails from './manage_user_details'
import manageUserAttention from './manage_user_attention'

function* mainSaga() {
  yield fork(manageUserDetails)
  yield fork(manageUserAttention)
}

module.exports = mainSaga
