const React = require('react')
const ReactDOM = require('react-dom')
const { createStore } = require('redux')
const { Provider } = require('react-redux')
const Roomz = require('./roomz/roomz')

const initialState = {
  userDetails: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Roomz />
  </Provider>,
  document.getElementById('app')
)
