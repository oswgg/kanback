import { PrismaClient, User } from "@prisma/client";
import { CustomError } from "../../../utils/middlewares/ErrorHandler";
import { ModelError } from "../../../utils/interfaces/ErrorInterfaces";
import userEvents from "../../user/events/userEvents";

const db = new PrismaClient().organization

export default class OrganizationService {

    static async create(body: any, user: User) {
        try {
            if (user.organization_uuid !== null) {
                const relationError: ModelError = {
                    model: 'User',
                    message: "User already has an organization",
                    props: {
                        organization_uuid: user.organization_uuid
                    }
                }
                throw new CustomError("User already has an organization", 406, 'DuplicateError', relationError)
            }

            const newOrganization = await db.create({ data: body })

            userEvents.emit("UserCreateOrganization", user.id, newOrganization.uuid)

            return newOrganization
        } catch (err: any) {
            throw err
        }
    }
}
