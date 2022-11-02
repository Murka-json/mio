const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const webserver = require('#lib/webserver.js')
const fastify = require('#src/fastify/main.js')

module.exports.start = async() => {
    await postgresql.connect()
    await webserver.listen()
    await fastify.listen()
    await redis.connect()
}