// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const multer = require('fastify-multer')
const path = require('path')
const fs = require('fs')


module.exports = (req, reply) => {
    redis.get(`user:${req.headers.token}`).then(async r => {
        r = JSON.parse(r)
        const urlImage = `${path.resolve()}/lib/static/${req.file.filename}`

        if(!r) {
            fs.unlink(urlImage, (err) => console.log(err))
            return reply.send({
                code: 405,
                data: `Ошибка доступа`
            })
        }

        reply.send({
            code: 200,
            data: `Аватарка успешно загружена`
        })

        postgresql.request(`UPDATE users SET avatar = $1 WHERE id = ${r.id}`, [ `${urlImage}.jpeg` ])
    })
}