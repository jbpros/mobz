import {
  call,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import {
  INITIALIZE_API,
  SET_USER_STATUS
} from '../actions'

function* manageUserStatus() {
  yield takeLatest(INITIALIZE_API, function* ({ api }) {
    yield takeEvery(SET_USER_STATUS, function* ({ email, status }) {
      yield call(::api.setUserStatus, { email, status })
    })
  })
}

module.exports = manageUserStatus
