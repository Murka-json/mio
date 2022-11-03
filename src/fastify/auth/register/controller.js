// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')

module.exports = async() => {
    fastify.post("/register", (req, reply) => {
        console.log(req.body)
        if(!req.body || !req.body.email || !req.body.password || !req.body.name) {
            return reply.send({
                code: 300,
                data: `Не указаны все параметры`
            })
        }

        if(!utils.validationEmail(req.body.email)) {
            return reply.send({
                code: 408,
                data: `Некорретный email`
            })
        }

        if(req.body.name.length < 3) {
            return reply.send({
                code: 401,
                data: `Никнейм не должен быть менее 3-х символов`
            })
        }

        if(req.body.name.length > 15) {
            return reply.send({
                code: 320,
                data: `Никнейм не должен быть более 15-ти символов`
            })
        }

        if(req.body.password.length < 3) {
            return reply.send({
                code: 402,
                data: `Пароль не должен быть менее 3-х символов`
            })
        }

        require('./service')(req.body, reply)
    })
}