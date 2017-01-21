import querystring from 'querystring'
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

const params = querystring.parse(global.location.search.substr(1))
const configScope = params.profile || 'default'
const configItemId = item => `${configScope}.${item}`

function* manageUserDetails() {
  yield fork(persistNewUserDetails)
  yield call(restoreUserDetails)
}

function* restoreUserDetails() {
  const restoredUserDetails = JSON.parse(localStorage.getItem(configItemId('userDetails')) || 'null')
  if (restoredUserDetails)
    yield put(setUserDetails(restoredUserDetails))
}

function* persistNewUserDetails() {
  yield takeEvery(SET_USER_DETAILS, function* ({ userDetails }) {
    localStorage.setItem(configItemId('userDetails'), JSON.stringify(userDetails))
    // TODO: extract to separate saga:
    yield call(api.enterRoom, userDetails)
  })
}

module.exports = manageUserDetails
