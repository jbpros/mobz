const React = require('react')

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
    this.props.onSubmit({
      deviceId: `did-${Math.random()}`,
      email: this.state.email
    })
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

module.exports = UserDetailsForm
