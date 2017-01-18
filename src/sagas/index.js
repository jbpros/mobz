import {
  fork,
  takeEvery
} from 'redux-saga/effects'
import {
  SET_USER_DETAILS
} from '../actions'

function* mainSaga() {
  yield fork(manageLocalStorage)
  yield takeEvery(SET_USER_DETAILS, handle)
}

function* handle(details) {
  console.log('took set user details', details)
}

function* manageLocalStorage() {
  yield takeEvery(SET_USER_DETAILS, function* ({ email }) {
    console.log('got', email)
    localStorage.setItem('userDetails', JSON.stringify({ email }))
  })
}

module.exports = mainSaga
