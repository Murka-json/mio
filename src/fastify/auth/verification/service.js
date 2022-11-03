// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const { hashPassword, generate_token } = require('#lib/utils.js')

module.exports = async (body, reply) => {
    redis.get(`verification:${body.code}`).then(async (cachedUser) => {
        cachedUser = JSON.parse(cachedUser)

        if (!cachedUser) {
            return reply.send({
                code: 318,
                data: `Код введён неверно`
            })
        }

        const token = generate_token(36)
        
        const [security] = await postgresql.request(`INSERT INTO security(password, email, token) VALUES ('${await hashPassword(cachedUser.password)}', '${cachedUser.email}', '${token}') RETURNING *`)
        const [user] = await postgresql.request(`INSERT INTO users(name) VALUES ('${cachedUser.name}') RETURNING *`)
        await postgresql.request(`INSERT INTO stats(read) VALUES (0) RETURNING *`)

        const result = Object.assign(user, security)
        const cacheToken = await redis.set(`user:${token}`, JSON.stringify(result))

        reply.send({
            code: 200,
            data: Object.assign(result, cacheToken)
        })
        redis.del(`verification:${body.code}`)
    })
}