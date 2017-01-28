const React = require('react')
const { connect } = require('react-redux')
const {
  hasUserDetails,
} = require('../pickers')
const UserDetails = require('./UserDetails')
const RoomAttendees = require('./RoomAttendees')
const {
  pickAllEvents,
  pickRoomAttendees,
  pickUserDetails
} = require('../pickers')

class Mobz extends React.Component {
  renderUserDetails() {
    return <UserDetails />
  }

  renderRoom() {
    return <div>
      <RoomAttendees attendees={this.props.roomAttendees} />
    </div>
  }

  renderMainContents() {
    if (this.props.needsUser)
      return this.renderUserDetails()
    return this.renderRoom()
  }

  render() {
    // TODO: use monad to replace the following {... && ...}:
    return <div>
      {this.renderMainContents()}
      <hr />
      <div>Email: {this.props.userDetails && this.props.userDetails.email}</div>
      <div>Events: <pre>{JSON.stringify(this.props.events, null, 2)}</pre></div>
    </div>
  }
}

Mobz.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  needsUser: React.PropTypes.bool.isRequired,
  roomAttendees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  userDetails: React.PropTypes.object
}

const mapStateToProps = state => ({
  events: pickAllEvents(state),
  needsUser: !hasUserDetails(state),
  roomAttendees: pickRoomAttendees(state),
  userDetails: pickUserDetails(state)
})

module.exports = connect(mapStateToProps)(Mobz)
