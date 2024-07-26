import { $Enums, OrgInvitationCodes, PrismaClient, User } from "@prisma/client";
import { DuplicatedError, ForbbidenError } from "../../../utils/interfaces/ErrorInterfaces";
import { CustomError } from "../../../utils/middlewares/ErrorHandler";
import organizationEvents from "../events/organizationEvents"
import { generateRandomString } from "../../../utils/helpers";

const prisma = new PrismaClient();

const Organization = prisma.organization
const Invitation = prisma.orgInvitationCodes

export default class OrganizationService {

    static async create(body: any, user: User) {
        try {
            if (user.organization_uuid !== null) {
                const relationError: DuplicatedError = {
                    message: "User already has an organization",
                    statusCode: 406,
                    content: {
                        model: 'User',
                        type: 'DuplicatedError',
                        props: {
                            duplicated: {
                                organization_uuid: user.organization_uuid
                            }
                        }
                    }
                }
                throw new CustomError(relationError)
            }

            const newOrganization = await Organization.create({ data: body })

            organizationEvents.emit('OrganizationCreated', [user.id, newOrganization.uuid])

            return newOrganization
        } catch (err: any) {
            throw err
        }
    }


    static async createInvitation(data: { body: any, user: User }) {
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
        const _organizationReg = await this.findOneBy({ uuid: user.organization_uuid })

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

    }

    static findOneBy = (where: any) => Organization.findUnique({ where })


}


