import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../../utils/middlewares/ErrorHandler'
import { ERROR_TYPE_DICTIONARY } from '../../../utils/dictionaries/ErrorDictionary'

export default {
    signup: (req: Request, res: Response, next: NextFunction) => {
        try {
            throw new CustomError("error", 404, ERROR_TYPE_DICTIONARY.PAYLOAD, "aaa")
            throw { message: "error" }
        } catch (err) {
            return next(err)
        }
    },

    auth: (req: Request, res: Response) => {
        console.log("Autentificando ahora")
    },


}

