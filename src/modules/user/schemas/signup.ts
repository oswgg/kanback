import _ from 'joi'
import { joiPasswordExtendCore } from 'joi-password'
const _pass = _.extend(joiPasswordExtendCore)

export default _.object({
    username: _.string().min(5).max(50).required(),
    first_name: _.string().max(50).required(),
    last_name: _.string().max(50).required(),
    email: _.string().email().required(),
    age: _.number().integer().positive(),
    sex: _.number().integer().positive(),
    password: _pass.string()
        .min(8)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters().required(),
    password_confirmation: _.string().required().valid(_.ref("password")).messages({ 'any.only': 'Passwords does not match' })
}).unknown(false)


export interface UserSignup {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    age?: number,
    sex?: number,
    password: string,
    password_confirmation: string
}
