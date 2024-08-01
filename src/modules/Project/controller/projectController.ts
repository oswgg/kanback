import { Request, Response, NextFunction } from 'express'
import ProjectService from '../services/projectService'
import { ForbiddenErrorFactory } from '../../../utils/interfaces/ErrorInterfaces'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'

export default {
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


    updateProject: async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err: any) {

        }
    },
}
