// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const multer = require('fastify-multer')
const fs = require('fs')

const upload = multer({
    dest: "lib/static"
})

module.exports = async () => {
    fastify.post("/upload/avatar", { preHandler: upload.single('avatar') }, (req, reply) => {
        require('./service')(req, reply)
    })
}