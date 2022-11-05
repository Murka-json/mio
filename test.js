// @ts-nocheck
const axios = require('axios')

async function start() {
    axios.post("https://mio-app.su/api/get_account", {
        token: "FuGv7kHSDshFQPq0R60IJuRfwhLx9ZLVa16G"
    }).then(r => {
        console.log(r.data)
    }).catch(err => {
        console.log(err)
    })
}


start()