// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const utils = require('#lib/utils.js')


module.exports = async() => {
    fastify.post("/api/search/users", (req, reply) => {

        if(!req.body) return
        if (!req.body.query) {
            return reply.send({
                code: 312,
                data: `Увы, но мы на стороне конкретики`
            })
        }

        return require('./service')(req.body, reply)
    })
}