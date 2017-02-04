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
const Api = require('./api')
const {
  initializeApi,
  closeApi,
  receiveEvent
} = require('./actions')

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mainSaga)

ReactDOM.render(
  <Provider store={store}>
    <Mobz />
  </Provider>,
  document.getElementById('app')
)

let socket

const connect = () => {
  console.log("connecting")
  socket = new WebSocket('ws://localhost:8080')

  socket.addEventListener('open', () => {
    console.log("connected")
    const api = new Api(socket)
    store.dispatch(initializeApi(api))
  })

  socket.addEventListener('message', ({ data }) => {
    const event = JSON.parse(data)
    store.dispatch(receiveEvent(event))
  })

  socket.addEventListener('error', () => {
    // console.log("ERROR", a)
  })

  socket.addEventListener('close', () => {
    console.log("closed")
    store.dispatch(closeApi())
    setTimeout(connect, 2000)
  })
}

connect()
