// @ts-nocheck
const http = require("http")
const config = require('#config.js')
const { default: fastify } = require("fastify")
const multer = require('fastify-multer')

this.Fastify = fastify({
    serverFactory: handler => {
        return this.Server = http.createServer((req, res) => handler(req, res))
    }
})
this.Fastify.register(multer.contentParser)
module.exports.fastify = this.Fastify
module.exports.listen = async() => {
    this.Fastify.ready(() => {
        this.Server.listen(config.port, () => console.log(`WebServer worked`))
    })
}