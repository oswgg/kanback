import { $Enums, PrismaClient, Project, ProjectMember, User } from "@prisma/client";
import { CustomError } from "../../../utils/middlewares/ErrorHandler";
import { createProjectPayload } from "../schemas/createProjectPayload";
import Service from "../../../utils/interfaces/ServiceInterface";
import { DuplicatedErrorFactory } from "../../../utils/interfaces/ErrorInterfaces";
import { generateRandomString } from "../../../utils/helpers";
import projectEvents from "../events/projectEvents";

const prisma = new PrismaClient()

const Project = prisma.project
const ProjectMember = prisma.projectMember

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

            const createdProjectMember = projectEvents.emit("ProjectCreated", [creatorUser.id, newProject.code_id])

            return {
                newProject,
                createdProjectMember,
            }

        } catch (err: any) {
            if (err instanceof CustomError)
                throw err

            throw new CustomError(this.possibleError)
        }
    }

    static async addMember(userID: number, projectCodeID: string, role: $Enums.ProjectMemberTypes) {
        try {
            const dataRelUserProject: ProjectMember = {
                project_code_id: projectCodeID,
                user_id: userID,
                role
            }

            const userIsMember = await ProjectMember.findUnique({
                where: {
                    project_code_id_user_id: {
                        project_code_id: projectCodeID,
                        user_id: userID,
                    }
                }
            })

            if (userIsMember) {
                const alreadyMember = new DuplicatedErrorFactory(
                    'User is already in the project',
                    'ProjectMember',
                    { user_id: userID, project_code_id: projectCodeID }
                )

                throw new CustomError(alreadyMember)
            }

            const projectMeberRel = await ProjectMember.create({ data: dataRelUserProject })

            return projectMeberRel

        } catch (err: any) {
            console.log(err)
            if (err instanceof CustomError)
                throw err

            throw this.possibleError
        }

    }



    static findOne = (where: Partial<Project>) => Project.findFirst({ where });
    static findAll = (where: Partial<Project>) => Project.findMany({ where })
}
