import { takeEvery } from 'redux-saga/effects'
import {
  SET_USER_DETAILS
} from './actions'

function* handle(details) {
  console.log('took set user details', details)
}

function* mainSaga() {
  yield takeEvery(SET_USER_DETAILS, handle)
}

module.exports = mainSaga
