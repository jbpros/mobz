const React = require('react')
const classname = require('classname')

const StatusIndicator = ({ apiStatus }) => {
  const className = classname('m1 p0 StatusIndicator', {
    'StatusIndicator--ready': apiStatus == 'ready',
    'StatusIndicator--closed': apiStatus == 'closed'
  })
  return <div className={className}></div>
}

StatusIndicator.propTypes = {
  apiStatus: React.PropTypes.oneOf(['ready', 'closed']).isRequired
}

module.exports = StatusIndicator
