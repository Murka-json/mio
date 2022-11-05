// @ts-nocheck
const { request } = require('#lib/database/postgresql.js')
const redis = require("#lib/database/redis.js")

module.exports = async({ token, to }, reply) => {
    redis.get(`user:${token}`).then(async r => {
        r = JSON.parse(r)
        if(!r) {
            return reply.send({
                code: 305,
                data: `Ошибка доступа`
            })
        }

        const [send_always] = await request(`SELECT * FROM request WHERE to_user = ${to} AND out_user = ${r.id}`)

        if(send_always) {
            return reply.send({
                code: 503,
                data: `Заявка уже отправлена`
            })
        }

        const [send_other_user] = await request(`SELECT * FROM request WHERE to_user = ${r.id} AND out_user = ${to}`)

        if(send_other_user) {
            return reply.send({
                code: 409,
                data: `Примите заявку от пользователя`
            })
        }

        reply.send({
            code: 200,
            data: `Заявка успешно отправлена`
        })

        const [out_user] = await request(`SELECT * FROM users WHERE id = (SELECT id FROM security WHERE token = '${token}')`)

        request(`
            INSERT 
                INTO 
                    request
            (to_user, out_user, avatar_user, name_user, role_user) 
                VALUES 
                    (   
                        ${to}, 
                        ${r.id}, 
                        '${out_user.avatar}', 
                        '${out_user.name}', 
                        '${out_user.role}'
                    )
        `)
    })
}