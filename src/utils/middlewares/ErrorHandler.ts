import { Request, Response, NextFunction } from 'express'
import { ErrorType } from "../types/types"

export class CustomError extends Error {
    statusCode: number
    type: ErrorType
    content: any

    constructor(message: string, statusCode: number, type: ErrorType, content: any) {
        super(message)
        this.statusCode = statusCode
        this.type = type
        this.content = content
        this.name = this.constructor.name

        Object.setPrototypeOf(this, CustomError.prototype)
    }
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.statusCode).json({
        ok: false,
        error: {
            type: error.type,
            content: error.content
        }
    })
}

export default errorHandler
