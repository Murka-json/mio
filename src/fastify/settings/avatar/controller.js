// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const multer = require('fastify-multer')

const upload = multer({
    dest: "lib/static"
})

module.exports = async () => {
    fastify.post("/upload/avatar", { preHandler: upload.single('file') }, (req, reply) => {
        reply.code(200).send('upload')
    })
}