module.exports.listen = async () => {
    require('./auth/recovery/resetPassword/controller')()
    require('./auth/recovery/sendCode/controller')()
    require('./auth/recovery/getCode/controller')()
    require('./auth/verification/controller')()
    require('./settings/password/controller')()
    require('./settings/avatar/controller')()
    require('./settings/status/controller')()
    require('./settings/name/controller')()
    require('./profile/other/controller')()
    require('./auth/register/controller')()
    require('./search/users/controller')()
    require('./search/manga/controller')()
    require('./auth/token/controller')()
    require('./profile/im/controller')()
    require('./auth/login/controller')()
}