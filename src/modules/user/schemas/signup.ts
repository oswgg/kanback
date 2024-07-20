import _ from 'joi'

export default _.object({
    username: _.string().required(),
    first_name: _.string().required(),
    last_name: _.string().required(),
    email: _.string().email().required(),
    password: _.string().required(),
    password_confirmation: _.string().required()
}).unknown(false)
