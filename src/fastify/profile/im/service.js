// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const memory = require('#lib/database/memory.js')
const redis = require('#lib/database/redis.js')


module.exports = async (body, reply) => {
    await redis.get(`user:${body.token}`).then(async r => {
        r = JSON.parse(r)

        if (!r) {
            return reply.send({
                code: 304,
                data: `Токен не валиден`
            })
        }

        const [user] = await postgresql.request(`SELECT * FROM users, security, stats WHERE security.token = $1 AND users.id = stats.id AND users.id = security.id`, 
        [ body.token ])
        
        if(!user) {
            return reply.send({
                code: 304,
                data: `Ошибка данных`
            })
        }

        reply.send({
            code: 200,
            data: user
        })
    })
}