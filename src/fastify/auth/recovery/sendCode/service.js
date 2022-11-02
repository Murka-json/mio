const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const utils = require('#lib/utils.js')

module.exports = async(body, reply) => {

    const [user] = await postgresql.request(`SELECT * FROM security WHERE email = '${body.email}'`)
    if(!user) {
        return reply.send({
            code: 401,
            data: `Пользователя с такой почтой не существует`
        })
    }

    reply.send({
        code: 200,
        data: `Код отправлен Вам на почту`
    })

    const code = utils.generate_code(6)
    console.log(code)
    utils.send_email(body.email, code)
    redis.set(`reset:${code}`, JSON.stringify(body.email))
    redis.expire(`reset:${code}`, 500000)
}