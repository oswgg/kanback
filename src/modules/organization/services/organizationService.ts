import { PrismaClient, User } from "@prisma/client";
import { ForbiddenErrorFactory } from "../../../utils/interfaces/ErrorInterfaces";
import { CustomError } from "../../../utils/middlewares/ErrorHandler";
import organizationEvents from "../events/organizationEvents";

const prisma = new PrismaClient();

const Organization = prisma.organization

export default class OrganizationService {

    static async create(body: any, user: User) {
        try {
            if (user.organization_uuid !== null) {
                const userHasOrg = new ForbiddenErrorFactory(
                    'User already has an organization',
                    'User',
                    null,
                    { organization_uuid: user.organization_uuid }
                )

                throw new CustomError(userHasOrg)
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


