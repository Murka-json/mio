// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')


module.exports = async() => {
    fastify.post("/api/login", (req, reply) => {
        
        if(!req.body || !req.body.login || !req.body.password) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }
        
        require('./service')(req.body, reply)
    })
}