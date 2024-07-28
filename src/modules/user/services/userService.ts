import { $Enums, PrismaClient } from '@prisma/client'
import { UserSignup } from '../schemas/signup'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { DuplicatedErrorFactory } from '../../../utils/interfaces/ErrorInterfaces'
import { hashPassword } from '../../../utils/helpers'

const User = new PrismaClient().user
export default class UserService {

    static async signUp(data: UserSignup) {
        try {
            const { username, email, first_name, last_name, age, sex, password, password_confirmation } = data

            const existingEmailUser = await User.findUnique({ where: { email } })

            if (existingEmailUser) {
                const emailExists = new DuplicatedErrorFactory(
                    `User with email ${username} already exists`,
                    'User',
                    { email }
                )

                throw new CustomError(emailExists)
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

            const userCreated = await User.create({ data: infoToCreateUser })

            return userCreated
        } catch (err) {
            throw err
        }
    }

    static createOrganization = async (id: number, organization_uuid: string) =>
        await User.update({ where: { id }, data: { organization_uuid, role: $Enums.OrgRole.admin } })

    static joinToOrganization = async (id: number, organization_uuid: string) =>
        await User.update({ where: { id }, data: { organization_uuid, role: $Enums.OrgRole.member } }).then(res => res)


    static async findOneBy(where: any) {
        return await User.findUnique({ where })
    }

}
