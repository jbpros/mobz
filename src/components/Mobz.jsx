const React = require('react')
const { connect } = require('react-redux')
const {
  hasUserDetails,
} = require('../pickers')
const UserDetails = require('./UserDetails')
const { pickAllEvents } = require('../pickers')

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
    return <div>
      {this.renderMainContents()}
      <div>Events: {this.props.events.length}</div>
    </div>
  }
}

Mobz.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  needsUser: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  events: pickAllEvents(state),
  needsUser: !hasUserDetails(state)
})

module.exports = connect(mapStateToProps)(Mobz)
