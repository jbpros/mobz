import {
  call,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import {
  INITIALIZE_API,
  TOGGLE_ATTENDEE_ATTENTION
} from '../actions'

function* manageUserAttention() {
  yield takeLatest(INITIALIZE_API, function* ({ api }) {
    let isPayingAttention = true
    yield takeEvery(TOGGLE_ATTENDEE_ATTENTION, function* ({ email }) {
      isPayingAttention = !isPayingAttention
      if (isPayingAttention)
        yield call(::api.startPayingAttention, { email })
      else {
        yield call(::api.stopPayingAttention, { email })
      }
    })
  })
}

module.exports = manageUserAttention
