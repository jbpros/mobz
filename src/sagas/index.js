import { fork } from 'redux-saga/effects'
import manageUserDetails from './manage_user_details'

function* mainSaga() {
  yield fork(manageUserDetails)
}

module.exports = mainSaga
