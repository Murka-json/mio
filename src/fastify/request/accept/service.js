// @ts-nocheck
const { request } = require('#lib/database/postgresql.js')
const redis = require("#lib/database/redis.js")

module.exports = ({ token, user }, reply) => {
    redis.get(`user:${token}`).then(async r => {
        if(!r) {
            return reply.send({
                code: 400,
                data: `Ошибка доступа`
            })
        }
    })
    const [current_request] = await request(`SELECT * FROM request WHERE `)
}