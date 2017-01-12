const React = require('react')
const ReactDOM = require('react-dom')
const { createStore } = require('redux')

function reducer(state, action) {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(reducer)

class Roomz extends React.Component {
  render() {
    return <h1>roomz</h1>
  }
}

ReactDOM.render(
  <Roomz />,
  document.getElementById('app')
)
