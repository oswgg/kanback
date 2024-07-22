import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import UserService from '../services/userService'

export default {
    signup: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req
            const result = await UserService.signUp(body)

            return res.status(200).json({
                ok: true,
                data: result
            })
        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(err.message))
        }
    },

    login: (req: Request, res: Response) => {
        console.log("Autentificando ahora")
    },


}

