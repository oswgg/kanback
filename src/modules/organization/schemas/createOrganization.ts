import _ from 'joi'

export default _.object({
    name: _.string().trim().max(100).required(),
}).unknown(false)
