// @ts-nocheck
const { fastify } = require("#lib/webserver.js")


module.exports = async() => {
    fastify.post("/api/check-token", (req, reply) => {

        if(!req.body || !req.body.token) {
            return reply.send({
                code: 300,
                data: `Введены не все параметры`
            })
        }
        
        require('./service')(req.body, reply)
    })
}