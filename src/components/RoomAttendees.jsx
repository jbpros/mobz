const React = require('react')

class RoomAttendees extends React.Component {
  renderAttendees() {
    return this.props.attendees.map(({ email }, i) => {
      return <li
        key={i}
        className="m1 p1 border bg-blue">{email}</li>
    })
  }

  render() {
    return <ul className="list-reset flex">{this.renderAttendees()}</ul>
  }
}

RoomAttendees.propTypes = {
  attendees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

module.exports = RoomAttendees
