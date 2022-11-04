// @ts-nocheck
const { fastify } = require("#lib/webserver.js")
const multer = require('fastify-multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../static')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
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