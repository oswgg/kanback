import { Request, Response, NextFunction } from 'express'
import { ForbiddenErrorFactory } from '../../../utils/interfaces/ErrorInterfaces'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { AddMemberPayload } from '../schemas/addMemberPayload'
import ProjectService from '../services/projectService'
import { $Enums } from '@prisma/client'

export default {
    getAllProjects: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authUser } = req

            if (!authUser.organization_uuid) {
                const userDontOrganization = new ForbiddenErrorFactory(
                    'User must be linked to an organization',
                    'User',
                    null,
                    ['organization_uuid']
                )

                throw new CustomError(userDontOrganization)
            }


            const content = await ProjectService.findAll({ organization_uuid: authUser.organization_uuid })

            return res.status(200).json({
                ok: true,
                content
            })

        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(null, err.message))
        }
    },

    createProject: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authUser, body } = req

            if (!authUser.organization_uuid) {
                const userDontOrganization = new ForbiddenErrorFactory(
                    'User must be linked to an organization',
                    'User',
                    null,
                    ['organization_uuid']
                )

                throw new CustomError(userDontOrganization)
            }

            const content = await ProjectService.createProject(body, authUser)

            return res.status(201).json({
                ok: true,
                content
            })
        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(null, err.message))

        }
    },


    updateProject: async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(null, err.message))


        }
    },


    addMember: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body }: { body: AddMemberPayload } = req

            const { project_code_id, user_id, role } = body

            // Si se agregan mas, se movera de lugar
            const MemberTypes: { [key in AddMemberPayload['role']]: $Enums.ProjectMemberTypes } = {
                admin: $Enums.ProjectMemberTypes.admin,
                member: $Enums.ProjectMemberTypes.member,
            }

            if (!MemberTypes[role])
                throw new CustomError(null, 'Invalid role')

            const content = await ProjectService.addMember(user_id, project_code_id, MemberTypes[role])

            return res.status(201).json({
                ok: true,
                content
            })

        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(null, err.message))


        }
    },
}
