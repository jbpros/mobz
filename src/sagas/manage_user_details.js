import {
  call,
  put,
  fork,
  takeEvery
} from 'redux-saga/effects'
import {
  SET_USER_DETAILS,
  setUserDetails
} from '../actions'
import api from '../api'

function* manageUserDetails() {
  yield fork(persistNewUserDetails)
  yield call(restoreUserDetails)
}

function* restoreUserDetails() {
  const restoredUserDetails = JSON.parse(localStorage.getItem('userDetails') || 'null')
  if (restoredUserDetails)
    yield put(setUserDetails(restoredUserDetails))
}

function* persistNewUserDetails() {
  yield takeEvery(SET_USER_DETAILS, function* ({ userDetails }) {
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
    // TODO: extract to separate saga:
    yield call(api.enterRoom, userDetails)
  })
}

module.exports = manageUserDetails
