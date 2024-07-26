import { ErrorType } from "../types/types"

export interface ErrorInterface {
    statusCode: number;
    message: string;
    content: {
        type: ErrorType;
        [key: string]: any;
    }
}


export interface NotFoundError extends ErrorInterface {
    statusCode: 404;
    message: string;
    content: {
        type: 'NotFoundError';
        model: string;
        props: {
            [key: string]: any;
        }
    }
}


export interface DuplicatedError extends ErrorInterface {
    statusCode: 406;
    message: string;
    content: {
        type: 'DuplicatedError';
        model: string;
        props: {
            duplicated: {
                [key: string]: any;
            }
        }
    }
}

export interface ForbbidenError extends ErrorInterface {
    content: {
        type: 'ForbiddenError';
        model: string
        props: {
            required?: {
                [key: string]: any;
            },
            forbidden?: {
                [key: string]: any;
            }
        }
    }
}
