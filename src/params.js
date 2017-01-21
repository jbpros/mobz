import querystring from 'querystring'

module.exports = () => querystring.parse(global.location.search.substr(1))
