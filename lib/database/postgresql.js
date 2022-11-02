const { Client } = require('pg')
const config = require('#config.js')

const db = new Client(config.postgresql)

module.exports.connect = async () => {
    await db.connect()
        .then(() => console.log(`Postgresql connected`))
        .catch((err) => console.log(`Postgresql error: `, err))
}


module.exports.request = async (sql, params) => {
    return new Promise(async (resolve, reject) => {
        await db.query(sql, params)
            .then(r => resolve(r.rows))
            .catch(err => reject(err))
    })
}