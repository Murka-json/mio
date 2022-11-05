// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')


module.exports = async() => {
    fastify.post("/api/edit/password", (req, reply) => {
        
        if(!req.body || !req.body.old_password || !req.body.new_password || !req.body.token) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }
        
        if(req.body.new_password.length < 3) {
            return reply.send({
                code: 402,
                data: `Пароль не должен быть менее 3-х символов`
            })
        }

        return require('./service')(req.body, reply)
    })
}