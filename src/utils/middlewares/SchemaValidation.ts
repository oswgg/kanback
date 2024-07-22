import { Request, RequestHandler, Response, NextFunction } from 'express'
import { SchemaErrorList } from '../interfaces/SchemaInterface'
import { CustomError } from './ErrorHandler'
import Joi from 'joi'

const SchemaValidation = (schema: Joi.Schema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = schema.validate(req.body, { abortEarly: false })

            if (error)
                throw error

            req.body = value
            next()
        } catch (err: any) {
            if (err instanceof Joi.ValidationError) {
                const errors: SchemaErrorList = {
                    errors: err.details.map((e: any) => {
                        return {
                            field: e.context.key,
                            message: e.message
                        }
                    })
                }

                return next(new CustomError('error', 400, 'PayloadError', errors))
            }

            return next(new CustomError('error', 400, 'UnknownError', { message: 'Oops...' }))
        }
    }

}

export default SchemaValidation
