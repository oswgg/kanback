import { Request, RequestHandler, Response, NextFunction } from 'express'
import { SchemaErrorList } from '../interfaces/SchemaInterface'
import { ERROR_TYPE_DICTIONARY } from '../dictionaries/ErrorDictionary'
import { SCHEMA_DICIONARY } from '../dictionaries/SchemaDictionary'
import { CustomError } from './ErrorHandler'
import Joi from 'joi'

export function SchemaValidation(schema: Joi.Schema): RequestHandler {
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
                            type: SCHEMA_DICIONARY[e.type],
                            field: e.context.key,
                            message: e.message
                        }
                    })
                }

                return next(new CustomError('error', 400, ERROR_TYPE_DICTIONARY.PAYLOAD, errors))
            }

            return next(new CustomError('error', 400, ERROR_TYPE_DICTIONARY.UNKNOWN, { message: 'Oops...' }))
        }
    }

}
