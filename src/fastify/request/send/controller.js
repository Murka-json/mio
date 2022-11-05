// @ts-nocheck
const { fastify } = require("#lib/webserver.js")


module.exports = () => {
    fastify.post('/api/request/send', (req, reply) => {
        
        if(!req.body || !req.body.to || !req.body.token) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }

        require('./service')(req.body, reply)
    })
}