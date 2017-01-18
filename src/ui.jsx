const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const {
  createStore,
  applyMiddleware
} = require('redux')
import createSagaMiddleware from 'redux-saga'
const Mobz = require('./components/Mobz')
const reducer = require('./reducer')
const mainSaga = require('./sagas')
const { receiveEvent } = require('./actions')

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mainSaga)

ReactDOM.render(
  <Provider store={store}>
    <Mobz />
  </Provider>,
  document.getElementById('app')
)

const es = new EventSource('http://127.0.0.1:8080/sse')
es.onmessage = ({ data }) => {
  const event = JSON.parse(data)
  store.dispatch(receiveEvent(event))
}
