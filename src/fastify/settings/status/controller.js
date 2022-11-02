// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')


module.exports = async() => {
    fastify.post("/edit/status", (req, reply) => {
        
        if(!req.body || !req.body.token || !req.body.status) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }
        
        if(req.body.status.length > 100) {
            return reply.send({
                code: 402,
                data: `Максимальная длина статуса - 100 символов`
            })
        }
        
        return require('./service')(req.body, reply)
    })
}