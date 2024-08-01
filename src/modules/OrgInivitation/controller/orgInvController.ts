import { Response, NextFunction, Request } from 'express'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { User } from '@prisma/client'
import OrgInvitationService from '../services/OrgInvitationService'

export default {
    createInvitation: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req
            const dataForService = {
                body,
                user: req.user as User
            }

            const content = await OrgInvitationService.createInvitation(dataForService)

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

    joinOrganization: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { params: { org_name, invitation_code } } = req

            const content = await OrgInvitationService.joinOrganization(org_name, invitation_code, req.user as User)

            return res.status(200).json({
                ok: true,
                content
            })

        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(null, err.message))
        }


    }
}
