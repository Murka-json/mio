// @ts-nocheck
const { fastify } = require('#lib/webserver.js')

module.exports = () => {
    fastify.post("/api/account/delete", (req, reply) => {

        if (!req.body || !req.body.token) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }

        require('./service')(req.body, reply)
    })
}