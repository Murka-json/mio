// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')


module.exports = async(body, reply) => {
    await redis.get(`user:${body.token}`).then(async r => {
        r = JSON.parse(r)
        
        if(!r) {
            return reply.send({
                code: 403,
                data: `Ошибка доступа`
            })
        }

        postgresql.request(`
            DELETE FROM users WHERE id = ${r.id};
            DELETE FROM stats WHERE id = ${r.id};
            DELETE FROM security WHERE id = ${r.id};
            DELETE FROM request WHERE to_user = ${r.id} OR out_user = ${r.id} 
        `)
        redis.del(`user:${body.token}`)

        reply.send({
            code: 200,
            data: `Аккаунт успешно удалён`
        })
    })
}