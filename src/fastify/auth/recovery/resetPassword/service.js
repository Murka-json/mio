// @ts-nocheck
const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const utils = require('#lib/utils.js')

module.exports = async(body, reply) => {
    await redis.get(`reset:${body.code}`).then(async(r) => {
        r = JSON.parse(r)

        if(!r) {
            return reply.send({
                code: 409,
                data: `Ошибка доступа`
            })
        }

        const [user] = await postgresql.request(`UPDATE security SET password = '${await utils.hashPassword(body.new_password)}' WHERE email = '${r}' RETURNING *`)

        return reply.send({
            code: 200,
            data: user,
            msg: `Пароль успешно восстановлен`
        })
    })
}