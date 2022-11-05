// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')


module.exports = async() => {
    fastify.post("/api/recovery/reset-password", (req, reply) => {
        
        if(!req.body || !req.body.code || !req.body.new_password || !req.body.check_password) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }

        if(req.body.new_password.length < 3) {
            return reply.send({
                code: 353,
                data: `Пароль должен быть не короче 3-х символов`
            })
        }

        if(req.body.new_password !== req.body.check_password) {
            return reply.send({
                code: 322,
                data: `Пароли не совпадают`
            })
        }
        
        require('./service')(req.body, reply)
    })
}