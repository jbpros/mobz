const React = require('react')
const classname = require('classname')
const Gravatar = require('./Gravatar')

class RoomAttendees extends React.Component {
  renderAttendees() {
    return this.props.attendees.map((attendeeDetails, i) => {
      const classNames = classname('block border circle border-darken', { 'faded': !attendeeDetails.isPayingAttention })
      return <li
        key={i}
        className="m1">
        <Gravatar
          email={attendeeDetails.email}
          className={classNames}
          size={48}
          onClick={() => this.props.onAttendeeClick(attendeeDetails)} />
        <span>{attendeeDetails.status}</span>
      </li>
    })
  }

  render() {
    return <ul className="m0 list-reset flex flex-wrap justify-center">{this.renderAttendees()}</ul>
  }
}

RoomAttendees.propTypes = {
  attendees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onAttendeeClick: React.PropTypes.func.isRequired
}

module.exports = RoomAttendees
