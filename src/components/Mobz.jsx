const React = require('react')
const { connect } = require('react-redux')
const {
  hasUserDetails,
} = require('../pickers')
const UserDetails = require('./UserDetails')
const {
  pickAllEvents,
  pickUserDetails
} = require('../pickers')

class Mobz extends React.Component {
  renderUserDetails() {
    return <UserDetails />
  }

  renderMainContents() {
    if (this.props.needsUser)
      return this.renderUserDetails()
    return <ul>
      <li>a</li>
      <li>b</li>
    </ul>
  }

  render() {
    // TODO: use monad to replace the following {... && ...}:
    return <div>
      {this.renderMainContents()}
      <div>Events: {this.props.events.length}</div>
      <div>Email: {this.props.userDetails && this.props.userDetails.email}</div>
    </div>
  }
}

Mobz.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  needsUser: React.PropTypes.bool.isRequired,
  userDetails: React.PropTypes.object
}

const mapStateToProps = state => ({
  events: pickAllEvents(state),
  needsUser: !hasUserDetails(state),
  userDetails: pickUserDetails(state)
})

module.exports = connect(mapStateToProps)(Mobz)
