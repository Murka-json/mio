// @ts-nocheck
const { fastify } = require("#lib/webserver.js")

module.exports = async() => {
    fastify.get("/:id", async(req, reply) => {

        if(!req.params?.id || Number(req.params?.id) == NaN) return
        
        return require('./service')(Number(req.params.id), reply)
    })
}