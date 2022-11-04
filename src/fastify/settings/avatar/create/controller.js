// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const { fastify } = require("#lib/webserver.js")
const multer = require('fastify-multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../static')
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + '.jpg')
  }
})

const upload = multer({
    storage: storage
})

module.exports = async () => {
    fastify.post("/api/upload/avatar", { preHandler: upload.single('avatar') }, (req, reply) => {
        require('./service')(req, reply)
    })
}