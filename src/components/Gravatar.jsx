const React = require('react')
const crypto = require('crypto')

const Gravatar = ({ email, size, className, onClick }) => {
  const gravatarHash = crypto.createHash('md5').update(email).digest('hex')
  const url = `https://www.gravatar.com/avatar/${gravatarHash}?s=${size * 2}`

  return <img
    title={email}
    src={url}
    className={className}
    height={size}
    width={size}
    onClick={onClick} />
}

Gravatar.propTypes = {
  className: React.PropTypes.string,
  email: React.PropTypes.string,
  size: React.PropTypes.number,
  onClick: React.PropTypes.func.isRequired
}

Gravatar.defaultProps = {
  className: '',
  size: 32
}

module.exports = Gravatar
