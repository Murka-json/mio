const postgresql = require('#lib/database/postgresql.js')
const redis = require('#lib/database/redis.js')
const utils = require('#lib/utils.js')


module.exports = (body, reply) => {
    postgresql.request(`SELECT * FROM security WHERE email = '${body.email}'`).then(([r]) => {
        if (r) {
            return reply.send({
                code: 405,
                data: `Данный email занят`
            })
        } else 

        reply.send({
            code: 200,
            data: `Код отправлен Вам на почту`
        })

        const code = utils.generate_code(5)
        console.log(code)
        
        redis.set(`verification:${code}`, JSON.stringify(body))
        redis.expire(`verification:${code}`, 300)
        utils.send_email(body.email, code)
    })

}