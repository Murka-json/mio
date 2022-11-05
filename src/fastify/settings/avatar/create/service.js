// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const multer = require('fastify-multer')
const path = require('path')
const fs = require('fs')

module.exports = (req, reply, imageName) => {
    console.log(req.file)
    redis.get(`user:${req.headers.token}`).then(async r => {
        const urlImage = path.resolve(`../static/${imageName}.jpg`)
        r = JSON.parse(r)
        console.log(r)
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

        await postgresql.request(`UPDATE users SET avatar = $1 WHERE id = ${r.id}`, [ `https://mio-app.su/static/${imageName}.jpg` ])
        await postgresql.request(`UPDATE request SET avatar_user = (SELECT avatar FROM users WHERE id = ${r.id})`)
    })
}