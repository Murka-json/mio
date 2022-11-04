const postgresql = require('#lib/database/postgresql.js')
const redis = require("#lib/database/redis.js")

module.exports = async (body, reply) => {
    let limit = !body?.limit ? 10 : body.limit
    let offset = !body?.offset ? 0 : body.offset

    const result = await redis.get(`search:users:limit=${limit}:offset=${offset}:` + body.query)

    if (result) {
        console.log(`redis`)
        return reply.send({
            code: 200,
            data: JSON.parse(result)
        })
    }

    const users = await postgresql.request(`SELECT * FROM users WHERE name LIKE '%${body.query}%' LIMIT $1 OFFSET $2`, [limit, offset])

    if(users.length == 0) {
        return reply.send({
            code: 304,
            data: `Ничего не найдено`
        })
    }

    reply.send({
        code: 200,
        data: users
    })

    await redis.set(`search:users:limit=${limit}:offset=${offset}:` + body.query, JSON.stringify(users))
    await redis.expire(`search:users:limit=${limit}:offset=${offset}:` + body.query, 300)
} 