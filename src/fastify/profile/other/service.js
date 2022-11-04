const postgresql = require('#lib/database/postgresql.js')
const redis = require("#lib/database/redis.js")

module.exports = async (id, reply) => {
    await postgresql.request(`SELECT * FROM users, stats WHERE users.id = $1 AND users.id = stats.id`, [id]).then(([r]) => {
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
    })
}