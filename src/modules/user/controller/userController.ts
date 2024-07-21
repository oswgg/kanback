import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { ERROR_TYPE_DICTIONARY } from '../../../utils/dictionaries/ErrorDictionary'

export default {
    signup: (req: Request, res: Response, next: NextFunction) => {
        try {
            throw { message: "error" }
        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(err.message))
        }
    },

    auth: (req: Request, res: Response) => {
        console.log("Autentificando ahora")
    },


}

