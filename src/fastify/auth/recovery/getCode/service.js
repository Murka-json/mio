const redis = require('#lib/database/redis.js')
const utils = require('#lib/utils.js')

module.exports = (body, reply) => {
    redis.get(`reset:${body.code}`).then((r) => {
        r = JSON.parse(r)
        if(!r) {
            return reply.send({
                code: 302,
                data: `Код введён неверно либо его срок службы истёк`
            })
        }

        return reply.send({
            code: 200,
            data: body.code,
            msg: `Код введён успешно`,
        })

    })
}