const React = require('react')
const { connect } = require('react-redux')

class Roomz extends React.Component {
  render() {
    return <h1>roomz</h1>
  }
}

const mapStateToProps = state => ({})

module.exports = connect(mapStateToProps)(Roomz)
