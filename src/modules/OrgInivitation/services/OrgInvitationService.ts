import { $Enums, OrgInvitationCodes, PrismaClient, User } from "@prisma/client"
import { ForbbidenError } from "../../../utils/interfaces/ErrorInterfaces"
import { CustomError } from "../../../utils/middlewares/ErrorHandler"
import { generateRandomString } from "../../../utils/helpers"

const prisma = new PrismaClient()

const Invitation = prisma.orgInvitationCodes
const Organization = prisma.organization

export default class OrgInvitationService {
    static async createInvitation(data: { body: any, user: User }) {
        try {
            const { user, body } = data

            if (user.role !== $Enums.OrgRole.admin) {
                const forbiddenError: ForbbidenError = {
                    statusCode: 403,
                    message: "Only admin can create invitations",
                    content: {
                        type: 'ForbiddenError',
                        model: 'User',
                        props: {
                            required: {
                                role: $Enums.OrgRole.admin
                            }
                        }
                    }
                }

                throw new CustomError(forbiddenError)
            }

            const invitationCode = generateRandomString(8)
            const _organizationReg = await Organization.findUnique({ where: { uuid: user.organization_uuid! } })

            const dataToCreateCodeReg: OrgInvitationCodes = {
                organization_uuid: _organizationReg?.uuid as string,
                organization_name: _organizationReg?.name as string,
                code: invitationCode,
                expirates_at: body.expiration_date,
                claimed_at: null,
                id_user_claimed: null
            }


            const createdCodeReg = await Invitation.create({ data: dataToCreateCodeReg })

            return createdCodeReg


        } catch (err: any) {
            throw err
        }
    }


    static async joinOrganization(org_name: string, invitation_code: string, user: User) {
        try {
            const invitationReg = await Invitation.findFirst({ where: { code: invitation_code, organization_name: org_name } })
            if (invitationReg?.claimed_at)
                throw new Error("This invitation has already been claimed.")

            const organizationReg = await Organization.findFirst({ where: { name: org_name } })


            console.log(invitationReg)

        } catch (err: any) {
            console.log(err)
            throw err
        }

    }


    static findOneBy = (where: any) => Invitation.findUnique({ where })

}
