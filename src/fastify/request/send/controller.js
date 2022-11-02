// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')


module.exports = async() => {
    fastify.post("/edit/name", (req, reply) => {
        
        if(!req.body || !req.body.token || !req.body.to) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }
        
        return require('./service')(req.body, reply)
    })
}