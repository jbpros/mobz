const React = require('react')
const { connect } = require('react-redux')
const { pickUserDetails } = require('../pickers')

class Roomz extends React.Component {
  render() {
    return <ul>
      <li>a</li>
      <li>b</li>
    </ul>
  }
}

const mapStateToProps = state => ({
  user: pickUserDetails(state)
})

module.exports = connect(mapStateToProps)(Roomz)
