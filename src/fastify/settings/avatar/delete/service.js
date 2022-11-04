const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')

module.exports = async(body, reply) => {
    await redis.get(`user:${body.token}`).then(async r => {

        if(!JSON.parse(r)) {
            return reply.send({
                code: 409,
                data: `Ошибка доступа`
            })
        }

        reply.send({
            code: 200,
            data: `Аватарка успешно удалена`
        })
    })

    await postgresql.request(`UPDATE users SET avatar = null`)
}