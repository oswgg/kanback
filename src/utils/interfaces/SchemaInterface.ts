import { SchemaValidationError } from '../types/types'

export interface SchemaError {
    type: SchemaValidationError,
    field: string,
    message: string
}

export interface SchemaErrorList {
    errors: SchemaError[]
}

