const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const { createStore } = require('redux')
const Roomz = require('./components/Roomz')
const reducer = require('./reducer')

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Roomz />
  </Provider>,
  document.getElementById('app')
)
