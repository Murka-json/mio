// @ts-nocheck
const axios = require('axios')
const path = require('path')
const fs = require('fs')

const FormData = require('form-data');
const { stdout } = require('process');

const form = new FormData();

form.append('file', fs.createReadStream(__dirname + '/avatar.jpg'), 'avatar.jpg')

axios({
    method: 'POST',
    url: "http://localhost:3010/api/upload/avatar",
    avatar: form,
    headers: {
        "Content-Type": "multipart/form-data",
        "token": "yWF4SgUpwsycCqkdErPTeD5cnfpC1qQfMPQR"
    }
}).then(({data}) => {
    console.log(data)
}).catch(err => {
    console.log(err)
})