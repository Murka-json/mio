const postgresql = require('#lib/database/postgresql.js')
const utils = require('#lib/utils.js')

module.exports = async (body, reply) => {
    const [security] = await postgresql.request(`SELECT * FROM security WHERE token = '${body.token}'`)

    if(!security || !await utils.unHashPassword(body.old_password, security.password)) {
        return reply.send({
            code: 404,
            data: `Ошибка доступа`
        })
    }

    const [user] = await postgresql.request(`
        UPDATE 
            security 
        SET 
            password = '${await utils.hashPassword(body.new_password)}' 
        WHERE 
            id = '${security.id}' RETURNING *`
    )

    return reply.send({
        code: 200,
        data: user
    })
}