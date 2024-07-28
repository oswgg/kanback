import { $Enums, OrgInvitationCodes, Prisma, PrismaClient, User } from "@prisma/client"
import { ErrorFactory, ForbiddenErrorFactory, NotFoundErrorFactory } from "../../../utils/interfaces/ErrorInterfaces"
import { CustomError } from "../../../utils/middlewares/ErrorHandler"
import { generateRandomString } from "../../../utils/helpers"
import orgInvitationEvents from "../events/invitationEvents"

const prisma = new PrismaClient()

const Invitation = prisma.orgInvitationCodes
const Organization = prisma.organization

export default class OrgInvitationService {
    static possibleError = new ErrorFactory(
        500,
        "Internal server error",
    )


    static async createInvitation(data: { body: any, user: User }) {
        try {
            const { user, body } = data
            if (!user.organization_uuid) {
                const userNotOrg = new ErrorFactory(
                    406,
                    'User must be associated with an organization',
                )

                throw new CustomError(userNotOrg)
            }

            if (user.role !== $Enums.OrgRole.admin) {
                const userNotAdmin = new ForbiddenErrorFactory(
                    'Only admin users are allowed to create invitations',
                    'User',
                    { organization_uuid: user.organization_uuid }
                )

                throw new CustomError(userNotAdmin)
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
            const invitationReg = await Invitation.findFirst({ where: { organization_name: org_name, code: invitation_code } })

            if (!invitationReg) {
                const notAnInvitation = new NotFoundErrorFactory(
                    'Invalid invitation code or organization name',
                    'OrgInvitationCodes', {
                    code: invitation_code,
                    organization_name: org_name
                })

                throw new CustomError(notAnInvitation)
            }

            if (invitationReg.claimed_at) {
                const alreadyClaimed = new ForbiddenErrorFactory(
                    'This invitation has already been claimed',
                    'OrgInvitationCodes', {
                    code: invitation_code,
                    organization_name: org_name
                })

                throw new CustomError(alreadyClaimed)
            }

            if (user.organization_uuid) {
                const alreadyAssociated = new ForbiddenErrorFactory(
                    'User is already associated with an organization',
                    'User', {
                    required: {
                        organization_uuid: null
                    }
                })

                throw new CustomError(alreadyAssociated)
            }


            const updatedInvitation = await Invitation.update({
                where: {
                    organization_uuid_code: {
                        organization_uuid: invitationReg.organization_uuid,
                        code: invitationReg.code,
                    }
                },
                data: {
                    claimed_at: new Date(),
                    id_user_claimed: user.id
                }
            })

            const userNowAssociate = orgInvitationEvents.emit('InvitationClaimed', [user.id, invitationReg.organization_uuid])

        } catch (err: any) {
            if (err instanceof CustomError)
                throw new CustomError(err)

            throw new CustomError(this.possibleError)
        }

    }


    static findByUQ = async (where: Prisma.OrgInvitationCodesWhereUniqueInput): Promise<OrgInvitationCodes | null> => {
        const invitation = await Invitation.findUnique({ where });
        return invitation;
    }


}
