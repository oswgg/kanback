import { Response, NextFunction, Request } from 'express'
import OrganizationService from '../services/organizationService'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { User } from '@prisma/client'

export default {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req

            const content = await OrganizationService.create(body, req.user as User)

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

    createInvitation: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req
            const dataForService = {
                body,
                user: req.user as User
            }

            const content = await OrganizationService.createInvitation(dataForService)

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
}
