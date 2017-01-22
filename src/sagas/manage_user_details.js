import {
  call,
  put,
  fork,
  take,
  takeEvery
} from 'redux-saga/effects'
import {
  INITIALIZE_API,
  SET_USER_DETAILS,
  setUserDetails
} from '../actions'
import params from '../params'

const configScope = params().profile || 'default'
const configItemId = item => `${configScope}.${item}`

function* manageUserDetails() {
  const { api } = yield take(INITIALIZE_API)
  console.log('api', api)
  yield fork(persistNewUserDetails, api)
  yield call(restoreUserDetails)
}

function* restoreUserDetails() {
  const restoredUserDetails = JSON.parse(localStorage.getItem(configItemId('userDetails')) || 'null')
  if (restoredUserDetails)
    yield put(setUserDetails(restoredUserDetails))
}

function* persistNewUserDetails(api) {
  yield takeEvery(SET_USER_DETAILS, function* ({ userDetails }) {
    localStorage.setItem(configItemId('userDetails'), JSON.stringify(userDetails))
    // TODO: extract to separate saga:
    yield call(api.enterRoom.bind(api), userDetails)
  })
}

module.exports = manageUserDetails
