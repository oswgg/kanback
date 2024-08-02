import { Response, NextFunction, Request } from 'express'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { User } from '@prisma/client'
import OrganizationServiceClass from '../services/organizationService'

const OrganizationService = new OrganizationServiceClass()

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


}
