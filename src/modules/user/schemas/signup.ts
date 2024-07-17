import _ from 'joi'

export default _.object({
    username: _.string().required()
})
