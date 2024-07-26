import { Request, Response, NextFunction } from 'express'
import { ErrorType } from "../types/types"
import { ErrorInterface } from '../interfaces/ErrorInterfaces'

export class CustomError extends Error {
    statusCode: number
    content: any
    message: string

    constructor(error: ErrorInterface | null, message?: string) {
        super(message)
        this.statusCode = error?.statusCode || 500
        this.content = error?.content || {}
        this.message = error?.message || message || 'Oops..'
        this.name = this.constructor.name

        Object.setPrototypeOf(this, CustomError.prototype)
    }

}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {

    return res.status(error.statusCode).json({
        ok: false,
        message: error.message,
        content: error.content
    })
}

export default errorHandler
