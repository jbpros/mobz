const React = require('react')
const { connect } = require('react-redux')
const {
  hasUserDetails,
} = require('../pickers')
const UserDetails = require('./UserDetails')

class Roomz extends React.Component {
  renderUserDetails() {
    return <UserDetails />
  }

  render() {
    if (this.props.needsUser)
      return this.renderUserDetails()
    return <ul>
      <li>a</li>
      <li>b</li>
    </ul>
  }
}

Roomz.propTypes = {
  needsUser: React.PropTypes.bool.isRequired,
  isOutsideRooms: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  needsUser: !hasUserDetails(state),
})

module.exports = connect(mapStateToProps)(Roomz)
