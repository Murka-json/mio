const redis = require('#lib/database/redis.js')
const postgresql = require('#lib/database/postgresql.js')

module.exports = (body, reply) => {
    redis.get(`user:${body.token}`).then(r => {
        r = JSON.parse(r)

        if (!r) {
            postgresql.request(`SELECT * FROM security WHERE token = '${body.token}'`).then(([r]) => {
                if (!r) {
                    return reply.send({
                        code: 309,
                        data: `Токен не валиден`
                    })
                }

                return reply.send({
                    code: 200,
                    data: r
                })
            })
        }
        return reply.send({
            code: 200,
            data: r
        })
    })
}