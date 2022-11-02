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
        `UPDATE 
            users 
        SET 
            status = '${body.status.split(" ").join("").length < 1 ? `Статус не указан` : `${body.status}`}' 
        WHERE 
            id = '${security.id}' RETURNING *`
    )

    return reply.send({
        code: 200,
        data: user
    })
}