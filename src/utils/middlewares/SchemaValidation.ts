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
                const payloadErrors: SchemaErrorList = {
                    statusCode: 500,
                    message: 'Error in payload validation',
                    content: {
                        type: 'PayloadError',
                        errors: err.details.map((e: any) => {
                            return {
                                field: e.context.key,
                                message: e.message
                            }
                        })
                    }
                }

                return next(new CustomError(payloadErrors))
            }

            return next(new CustomError(null, "Oops"))
        }
    }

}

export default SchemaValidation
