import { $Enums, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { UserSignup } from '../schemas/signup'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { DuplicatedError, ErrorInterface } from '../../../utils/interfaces/ErrorInterfaces'

const db = new PrismaClient().user
export default class UserService {

    static async signUp(data: UserSignup) {
        try {
            const { username, email, first_name, last_name, age, sex, password, password_confirmation } = data

            const existingEmailUser = await db.findUnique({ where: { email } })

            if (existingEmailUser) {
                const duplicateContent: DuplicatedError = {
                    statusCode: 406,
                    message: "User with this email already exists",
                    content: {
                        type: 'DuplicatedError',
                        model: 'User',
                        props: {
                            duplicated: {
                                email: existingEmailUser.email
                            }
                        }
                    }
                }
                throw new CustomError(duplicateContent)
            }

            const hashedPassword = UserService.hashPassword(password)

            const infoToCreateUser = {
                username,
                email,
                first_name,
                last_name,
                password: hashedPassword,
                age,
                sex,
                role: $Enums.OrgRole.none
            }

            const userCreated = await db.create({ data: infoToCreateUser })

            return userCreated
        } catch (err) {
            throw err
        }
    }

    static createOrganization = async (id: number, organization_uuid: string) =>
        await db.update({ where: { id }, data: { organization_uuid, role: $Enums.OrgRole.admin } })


    static async findOneBy(where: any) {
        return await db.findUnique({ where })
    }


    static hashPassword(password: string) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    static isValidPassword = (userRegPass: string, givenPass: string): boolean => bcrypt.compareSync(givenPass, userRegPass)

}
