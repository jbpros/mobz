const React = require('react')
const { connect } = require('react-redux')
const UserDetailsForm = require('./UserDetailsForm')
const { pickUserDetails } = require('../pickers')
const { setUserDetails } = require('../actions')

// TODO: remember details between app runs
class UserDetails extends React.Component {
  handleSubmit({ deviceId, email }) {
    this.props.dispatch(setUserDetails({ deviceId, email }))
  }

  render() {
    return <div>
      <UserDetailsForm onSubmit={::this.handleSubmit} />
    </div>
  }
}

UserDetails.propTypes = {
  dispatch: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    userDetails: pickUserDetails(state)
  }
}

module.exports = connect(mapStateToProps)(UserDetails)
