// @ts-nocheck
const { request } = require('#lib/database/postgresql.js')
const redis = require("#lib/database/redis.js")

module.exports = async({ token, user }, reply) => {
    const requests = await request(`SELECT * FROM request WHERE to_user = ${user}`)

    if(!requests.length === 0) { 
        return reply.send({
            code: 402,
            data: `Список заявок пуст`
        })
    }

    return reply.send({
        code: 200,
        data: requests
    })
}