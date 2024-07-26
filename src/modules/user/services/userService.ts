import { $Enums, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { UserSignup } from '../schemas/signup'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { DuplicatedError } from '../../../utils/interfaces/ErrorInterfaces'
import { hashPassword } from '../../../utils/helpers'

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
            const hashedPassword = hashPassword(password)

            const infoToCreateUser = {
                username, email, first_name,
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

}
