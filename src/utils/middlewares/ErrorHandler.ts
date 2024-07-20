import { Request, Response, NextFunction } from 'express'
import { ErrorType } from "../types/types"

export class CustomError extends Error {
    statusCode: number
    type: ErrorType
    content: any

    constructor(message: string, statusCode: number = 500, type: ErrorType = 'UnknownError', content: any) {
        super(message)
        this.statusCode = statusCode
        this.type = type
        this.content = content
        this.name = this.constructor.name

        Object.setPrototypeOf(this, CustomError.prototype)
    }
}

const errorHandler = (error: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
    const isCustom = error instanceof CustomError

    const statusCode = isCustom ? error.statusCode : 500
    const errorType = isCustom ? error.type : 'UnknownError'
    const errorContent = isCustom ? error.content : error.message

    return res.status(statusCode || 500).json({
        ok: false,
        error: {
            type: errorType,
            content: errorContent
        }
    })
}

export default errorHandler
