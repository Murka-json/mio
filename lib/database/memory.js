const memory = require('memory-cache')

// module.exports = memory


module.exports.get = (key) => {
    return new Promise(async (resolve, reject) => {
        const data = await memory.get(key)
        resolve(data)
    })
}

module.exports.put = (key, value, time) => {
    memory.put(key, value, time)
    const user = memory.get(key)
    console.log(user)
}