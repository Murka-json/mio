// @ts-nocheck
const { fastify } = require("#lib/webserver")


module.exports = () => {
    fastify.post('/api/request/accept', (req, reply) => {
        
        if(!req.body || !req.body.token || !req.body.user) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }
        
        require('./service')(req.body, reply)
    })
}