import _ from 'joi'

export default _.object({
    email: _.string().email().required(),
    password: _.string().min(8).required()
})
