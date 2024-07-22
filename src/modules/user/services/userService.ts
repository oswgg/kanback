import { $Enums, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { UserSignup } from '../schemas/signup'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { DuplicateError } from '../../../utils/interfaces/ErrorInterfaces'

export default class UserService {

    static async signUp(data: UserSignup) {
        try {
            const { username, email, first_name, last_name, age, sex, password, password_confirmation } = data

            const existingEmailUser = await prisma.user.findUnique({ where: { email } })

            if (existingEmailUser) {
                const duplicateContent: DuplicateError = {
                    model: 'User',
                    message: 'User with this email already exists',
                    props: {
                        email: existingEmailUser.email
                    }
                }
                throw new CustomError('Cannot create User', 403, 'DuplicateError', duplicateContent)
            }

            const infoToCreateUser = {
                username,
                email,
                first_name,
                last_name,
                password,
                age,
                sex,
                role: $Enums.OrgRole.none
            }

            const userCreated = await prisma.user.create({ data: infoToCreateUser })

            return userCreated
        } catch (err) {
            throw err
        }
    }

    static findOneBy(where: any) {
        return prisma.user.findMany({ where })
    }

    static isValidPassword(userRegPass: string, givenPass: string): boolean {

        return userRegPass === givenPass
    }
}
