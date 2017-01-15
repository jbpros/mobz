const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const { createStore } = require('redux')
const Mobz = require('./components/Mobz')
const reducer = require('./reducer')

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Mobz />
  </Provider>,
  document.getElementById('app')
)
