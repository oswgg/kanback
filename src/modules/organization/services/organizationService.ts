import { PrismaClient, User } from "@prisma/client";
import { DuplicatedError } from "../../../utils/interfaces/ErrorInterfaces";
import { CustomError } from "../../../utils/middlewares/ErrorHandler";
import organizationEvents from "../events/organizationEvents";

const prisma = new PrismaClient();

const Organization = prisma.organization

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




    static findOneBy = (where: any) => Organization.findUnique({ where })


}


