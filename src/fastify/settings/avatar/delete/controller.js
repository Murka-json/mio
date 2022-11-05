// @ts-nocheck
const { fastify } = require("#lib/webserver.js")

module.exports = async () => {
    fastify.post("/api/avatar/delete", (req, reply) => {
        require('./service')(req.body, reply)
    })
}