const postgresql = require('#lib/database/postgresql.js')
const redis = require("#lib/database/redis.js")

module.exports = async (body, reply) => {
    let limit = !body?.limit ? 10 : body.limit
    let offset = !body?.offset ? 0 : body.offset

    const result = await redis.get(`search:manga:limit=${limit}:offset=${offset}:` + body.query)

    if (result) {
        console.log(`redis`)
        return reply.send({
            code: 200,
            data: JSON.parse(result)
        })
    }

    const catalog = await postgresql.request(`SELECT * FROM tiles WHERE name LIKE '%${body.query}%' LIMIT $1 OFFSET $2`, [limit, offset])

    if (catalog.length == 0) {
        return reply.send({
            code: 304,
            data: `Ничего не найдено`
        })
    }

    reply.send({
        code: 200,
        data: catalog
    })

    await redis.set(`search:manga:limit=${limit}:offset=${offset}:` + body.query, JSON.stringify(catalog))
    await redis.expire(`search:manga:limit=${limit}:offset=${offset}:` + body.query, 300)
} 