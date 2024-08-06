import _ from 'joi'

export default _.object({
    name: _.string().max(100).required(),
    description: _.string().max(500),
    welcome_text: _.string().max(500)
}).unknown(false)

export interface createProjectPayload {
    name: string;
    description?: string;
    welcome_text?: string;
}
