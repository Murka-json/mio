// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')


module.exports = async() => {
    fastify.post("/recovery/get_code", (req, reply) => {
        
        if(!req.body || !req.body.code) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }
        
        require('./service')(req.body, reply)
    })
}