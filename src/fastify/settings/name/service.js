const postgresql = require('#lib/database/postgresql.js')

module.exports = async (body, reply) => {

    const [security] = await postgresql.request(`SELECT * FROM security WHERE token = '${body.token}'`)

    if(!security) {
        return reply.send({
            code: 404,
            data: `Ошибка доступа`
        })
    }

    const [user] = await postgresql.request(
        `UPDATE users SET name = '${body.name}' WHERE id = ${security.id} RETURNING *
    `)

    return reply.send({
        code: 200,
        data: user
    })
}