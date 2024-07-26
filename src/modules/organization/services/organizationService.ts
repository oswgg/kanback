import { Request } from "express";
import { $Enums, PrismaClient, User } from "@prisma/client";
import { CustomError } from "../../../utils/middlewares/ErrorHandler";
import { DuplicatedError, ForbbidenError, ErrorInterface } from "../../../utils/interfaces/ErrorInterfaces";
import organizationEvents from "../events/organizationEvents"

const db = new PrismaClient().organization

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

            const newOrganization = await db.create({ data: body })

            organizationEvents.emit('OrganizationCreated', [user.id, newOrganization.uuid])

            return newOrganization
        } catch (err: any) {
            throw err
        }
    }


    static createInvitation(data: { body: any, user: User }) {
        const { user, body } = data

        if (user.role !== $Enums.OrgRole.admin) {
            const forbiddenError: ForbbidenError = {
                statusCode: 403,
                message: "Only admin can create organization invitations",
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

    }
}


