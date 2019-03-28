const config = require('./config')
const getBaseUrl = (env = 'sandbox', path = 'base') => config[path][env]

module.exports = {
	getBaseUrl
}
