import { PrismaClient, Project, User } from "@prisma/client";
import { CustomError } from "../../../utils/middlewares/ErrorHandler";
import { createProjectPayload } from "../schemas/createProjectPayload";
import Service from "../../../utils/interfaces/ServiceInterface";
import { DuplicatedErrorFactory } from "../../../utils/interfaces/ErrorInterfaces";
import { generateRandomString } from "../../../utils/helpers";

const prisma = new PrismaClient()

const Project = prisma.project

export default class ProjectService extends Service {

    static async createProject(data: createProjectPayload, creatorUser: User) {
        try {
            const { organization_uuid } = creatorUser
            const { name, description, welcome_text } = data

            const existingProject = await this.findOne({ name, organization_uuid: organization_uuid as string })

            if (existingProject) {
                throw new CustomError(new DuplicatedErrorFactory(
                    `Project with name ${name} already exists`,
                    'Project',
                    { name: name }
                ))
            }

            const code_id = generateRandomString(8)

            const infoToCreateProject = {
                code_id,
                organization_uuid: organization_uuid as string,
                created_by_user: creatorUser.id,
                name,
                description: description || null,
                welcome_text: welcome_text || null,
            }

            const newProject = await Project.create({ data: infoToCreateProject })

            return newProject

        } catch (err: any) {
            if (err instanceof CustomError)
                throw err

            throw new CustomError(this.possibleError)
        }
    }


    static findOne = (where: Partial<Project>) => Project.findFirst({ where });

}
