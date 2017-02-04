const React = require('react')
const { connect } = require('react-redux')
const classname = require('classname')
const {
  hasUserDetails,
} = require('../pickers')
const UserDetails = require('./UserDetails')
const RoomAttendees = require('./RoomAttendees')
const {
  pickApiStatus,
  pickAllEvents,
  pickRoomAttendees,
  pickUserDetails
} = require('../pickers')
const {
  toggleUserAttention
} = require('../actions')

class Mobz extends React.Component {
  handleAttendeeClick({ email }) {
    if (email === this.props.userDetails.email)
      this.props.dispatch(toggleUserAttention({ email: this.props.userDetails.email }))
  }

  renderUserDetails() {
    return <UserDetails />
  }

  renderRoom() {
    return <div>
      <RoomAttendees
        attendees={this.props.roomAttendees}
        onAttendeeClick={::this.handleAttendeeClick} />
    </div>
  }

  renderStatusIndicator() {
    const className = classname('m1 p0', {
      'api-ready': this.props.apiStatus == 'ready',
      'api-closed': this.props.apiStatus == 'closed'
    })
    return <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: 10,
        height: 10,
        'border-radius': '50%'
      }}
      className={className}></div>
  }

  renderMainContents() {
    if (this.props.needsUser)
      return this.renderUserDetails()
    return this.renderRoom()
  }

  render() {
    // TODO: use monad to replace the following {... && ...}:
    return <div>
      {this.renderStatusIndicator()}
      {this.renderMainContents()}
      <hr />
      <div>Email: {this.props.userDetails && this.props.userDetails.email}</div>
      <div>Events: <pre>{JSON.stringify(this.props.events, null, 2)}</pre></div>
    </div>
  }
}

Mobz.propTypes = {
  apiStatus: React.PropTypes.string.isRequired,
  events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  needsUser: React.PropTypes.bool.isRequired,
  roomAttendees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  userDetails: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  apiStatus: pickApiStatus(state),
  events: pickAllEvents(state),
  needsUser: !hasUserDetails(state),
  roomAttendees: pickRoomAttendees(state),
  userDetails: pickUserDetails(state),
})

module.exports = connect(mapStateToProps)(Mobz)
