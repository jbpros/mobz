const React = require('react')
const { connect } = require('react-redux')
const { pickUserDetails } = require('../pickers')
const { setUserDetails } = require('../actions')

class UserDetailsForm extends React.Component {
  constructor() {
    super()
    this.state = { email: '' }
  }

  handleChange(e) {
    this.setState({ email: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit({ email: this.state.email })
  }

  render() {
    return <form onSubmit={::this.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={this.state.email}
        onChange={::this.handleChange}></input>
    </form>
  }
}

UserDetailsForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

// TODO: remember details between app runs
class UserDetails extends React.Component {
  handleSubmit({ email }) {
    this.props.dispatch(setUserDetails({ email }))
  }

  render() {
    return <UserDetailsForm onSubmit={::this.handleSubmit} />
  }
}

UserDetails.propTypes = {
  dispatch: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userDetails: pickUserDetails(state)
})

module.exports = connect(mapStateToProps)(UserDetails)
