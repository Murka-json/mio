const { createClient } = require('redis')

const redis = createClient()

module.exports = redis