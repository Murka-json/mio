const postgresql = require('#lib/database/postgresql.js')
const redis = require("#lib/database/redis.js")

module.exports = async (id, reply) => {
    const cacheUsers = await redis.get(`cache:profile:${id}`)

    if (cacheUsers) {
        return reply.send({
            code: 200,
            data: JSON.parse(cacheUsers)
        })
    }

    await postgresql.request(`SELECT * FROM users, stats WHERE users.id = ${id} AND users.id = stats.id`).then(([r]) => {
        if (!r) {
            return reply.send({
                code: 403,
                data: `Пользователь не найден`
            })
        }

        reply.send({
            code: 200,
            data: r
        })
        redis.set(`cache:profile:${id}`, JSON.stringify(r))
        redis.expire(`cache:profile:${id}`, 20)
    })
}