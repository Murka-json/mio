const { exec } = require('child_process')
const bcrypt = require('bcrypt')
const config = require('#config.js')

module.exports = {
    validationEmail: (email) => {
        var pattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        return pattern.test(String(email).toLowerCase())
    },

    generate_code: (length) => {
        console.time("ms")
        let result = "";
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        for(let i=0;i<length;i++) {
            result += numbers[Math.floor(Math.random() * numbers.length)]
        }
        console.timeEnd("ms")
        return result
    },

    send_email: (email, code) => {
        exec(`echo "Ваш проверочный код: ${code}\n\n❗️ Код станет неактивен ровно через 5 минут" | mail -s "✅ Подтверждение регистрации" ${email}`,
        (error, stdout, stderr) => !error ? stderr : stdout)
    },

    generate_token: (length) => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (let i = 0; i < length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    },
    hashPassword: (password) => {
        return bcrypt.hashSync(password, config.layer_hashing)
    },
    unHashPassword: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    },

    send: async(reply, code, r) => {
        await reply.send({
            code: code,
            data: r
        })
    }
}