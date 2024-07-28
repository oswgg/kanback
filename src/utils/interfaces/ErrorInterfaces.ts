import { ErrorType } from "../types/types"

interface ErrorContent {
    type: ErrorType;
    model: string;
    props: {
        [key: string]: any;
    }
}

export class ErrorFactory {
    statusCode: number;
    message: string;
    content: ErrorContent | {}

    constructor(statusCode: number, message: string, content?: object) {
        this.statusCode = statusCode;
        this.message = message;
        this.content = content || {};
    }

}


export class NotFoundErrorFactory extends ErrorFactory {

    constructor(message: string, model: string, props: object) {
        const content: ErrorContent = {
            type: 'NotFoundError',
            model,
            props
        }
        super(404, message, content)
    }
}


export class DuplicatedErrorFactory extends ErrorFactory {
    constructor(message: string, model: string, duplicated: object) {
        const content: ErrorContent = {
            type: 'DuplicatedError',
            model,
            props: {
                duplicated
            }
        }
        super(409, message, content)
    }
}


export class ForbiddenErrorFactory extends ErrorFactory {
    constructor(message: string, model: string, required?: object | null, forbidden?: object | null) {
        const content: ErrorContent = {
            type: 'ForbiddenError',
            model,
            props: {
                required,
                forbidden
            }
        }
        super(403, message, content)
    }
}

