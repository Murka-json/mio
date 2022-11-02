const postgresql = require('#lib/database/postgresql.js')
const utils = require('#lib/utils.js')

module.exports = async(body, reply) => {
    const [user] = await postgresql.request(
        `SELECT 
                * 
        FROM 
            users, security 
        WHERE 
            users.id = security.id
            AND
            ${utils.validationEmail(body.login) ? `security.email` : `users.name`} = '${body.login}'`
    )

    
    if(!user || !await utils.unHashPassword(body.password, user.password)) {
        return reply.send({
            code: 308,
            data: `Данные введены неверно`
        })
    }

    return reply.send({
        code: 200,
        data: user
    })
}