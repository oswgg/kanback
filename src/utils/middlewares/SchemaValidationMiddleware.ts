import { Request, RequestHandler, Response, NextFunction } from 'express'
import Joi from 'joi'

export function SchemaValidation(schema: Joi.Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = schema.validate(req.body)

            console.log(value)
            if (error)
                throw error

        } catch (err) {
            if (err instanceof Joi.ValidationError)
                return res.status(400).json({
                    errors: err.details.map(e => e.message)
                })
        }
    }

}
