import { Request, Response, NextFunction } from 'express'
import { ErrorType } from "../types/types"

export class CustomError extends Error {
    statusCode: number
    type: ErrorType
    content: any

    constructor(message: string, statusCode?: number, type?: ErrorType, content?: any) {
        super(message)
        this.statusCode = statusCode || 500
        this.type = type || 'UnknownError'
        this.content = content || undefined
        this.name = this.constructor.name

        Object.setPrototypeOf(this, CustomError.prototype)
    }

}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {

    let errorToShow

    if (error.content) {
        errorToShow = {
            type: error.type,
            content: error.content
        }
    } else {
        errorToShow = {
            type: error.type,
            message: error.message
        }
    }

    return res.status(error.statusCode).json({
        ok: false,
        error: errorToShow
    })
}

export default errorHandler
