import _ from 'joi'

export default _.object({
    project_code_id: _.string().required(),
    user_id: _.number().integer().required(),
    role: _.string().valid('admin', 'member').required(),
}).unknown(false)

export interface AddMemberPayload {
    project_code_id: string;
    user_id: number;
    role: "admin" | "member";
}
