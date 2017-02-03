const React = require('react')
const crypto = require('crypto')

const Gravatar = ({ email, size, className }) => {
  const gravatarHash = crypto.createHash('md5').update(email).digest('hex')
  const url = `https://www.gravatar.com/avatar/${gravatarHash}?s=${size * 2}&d=mm`

  return <img
    title={email}
    src={url}
    className={className}
    height={size}
    width={size} />
}

Gravatar.propTypes = {
  className: React.PropTypes.string,
  email: React.PropTypes.string,
  size: React.PropTypes.number
}

Gravatar.defaultProps = {
  className: '',
  size: 32
}

module.exports = Gravatar
