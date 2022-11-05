// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')


module.exports = async() => {
    fastify.post("/api/edit/name", (req, reply) => {
        
        if(!req.body || !req.body.token || !req.body.name) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }
        
        if(req.body.name.length > 15) {
            return reply.send({
                code: 304,
                data: `Никнейм должен содержать до 15-ти символов`
            })
        }

        if(req.body.name.length < 3) {
            return reply.send({
                code: 304,
                data: `Минимальная длина никнейма - 3 символа`
            })
        }
        
        return require('./service')(req.body, reply)
    })
}