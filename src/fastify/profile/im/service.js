// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const memory = require('#lib/database/memory.js')
const redis = require('#lib/database/redis.js')


module.exports = async (body, reply) => {
    await redis.get(`user:${body.token}`).then(async (r) => {
        r = JSON.parse(r)

        if (!r) {
            return reply.send({
                code: 304,
                data: `Токен не валиден`
            })
        }

        const cacheUser = await redis.get(`get_account:${body.token}`)

        if(cacheUser) {
            return reply.send({
                code: 200,
                data: JSON.parse(cacheUser)
            }) 
        }

        const [user] = await postgresql.request(`SELECT * FROM users, security, stats WHERE users.name = '${r.name}' AND users.id = stats.id AND users.id = security.id`)
        
        reply.send({
            code: 200,
            data: user
        })
        redis.set(`get_account:${body.token}`, JSON.stringify(user))
        redis.expire(`get_account:${body.token}`, 15)
    })
}