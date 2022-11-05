// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const { fastify } = require("#lib/webserver.js")
const multer = require('fastify-multer')
const fs = require('fs')
const utils = require('#lib/utils.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../static')
    },
    filename: (req, file, cb) => {
        cb(null, imageName + '.jpg')
    }
})

const upload = multer({
    storage: storage
})

module.exports = async () => {
    fastify.post("/api/upload/avatar", { preHandler: upload.single('avatar') }, (req, reply) => {
        const imageName = utils.generate_token(40)

        require('./service')(req, reply, imageName)
    })
}