// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const memory = require('#lib/database/memory.js')
const redis = require('#lib/database/redis.js')


module.exports = async (body, reply) => {
    await redis.get(`user:${body.token}`).then(async r => {
        if (!r) {
            return reply.send({
                code: 304,
                data: `Токен не валиден`
            })
        }

        const [user] = await postgresql.request(`SELECT * FROM users, security, stats WHERE users.name = '${r.name}' AND users.id = stats.id AND users.id = security.id`)
        
        if(!user) {
            return reply.send({
                code: 304,
                data: `Ошибка`
            })
        }

        reply.send({
            code: 200,
            data: user
        })
    })
}