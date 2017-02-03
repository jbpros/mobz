const React = require('react')
const Gravatar = require('./Gravatar')

class RoomAttendees extends React.Component {
  renderAttendees() {
    return this.props.attendees.map(({ email }, i) => {
      return <li
        key={i}
        className="m1">
        <Gravatar
          email={email}
          className='block border circle border-darken'
          size={48} />
      </li>
    })
  }

  render() {
    return <ul className="list-reset flex flex-wrap justify-center">{this.renderAttendees()}</ul>
  }
}

RoomAttendees.propTypes = {
  attendees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

module.exports = RoomAttendees
