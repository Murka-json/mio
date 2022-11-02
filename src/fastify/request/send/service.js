const postgresql = require('#lib/database/postgresql.js')

module.exports = async(body, reply) => {
    const [always_friend] = await postgresql.request(`SELECT * from friends WHERE person = ${body.to} AND friend = (SELECT id FROM security WHERE token = '${body.token}')`)

    if(always_friend) {
        return reply.send({
            code: 405,
            data: `Вы уже в друзьях у пользователя`
        })
    }
}