const React = require('react')

class RoomAttendees extends React.Component {
  renderAttendees() {
    return this.props.attendees.map(({ email }, i) => {
      return <li key={i}>{email}</li>
    })
  }

  render() {
    return <ul>{this.renderAttendees()}</ul>
  }
}

RoomAttendees.propTypes = {
  attendees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

module.exports = RoomAttendees
