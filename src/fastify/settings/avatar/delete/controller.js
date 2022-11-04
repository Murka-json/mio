// @ts-nocheck
const { fastify } = require("#lib/webserver.js")

module.exports = async () => {
    fastify.post("/avatar/delete", (req, reply) => {
        require('./service')(req.body, reply)
    })
}