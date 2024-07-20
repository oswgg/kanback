import { SchemaValidationError } from '../types/types'

export interface SchemaError {
    type: SchemaValidationError,
    field: string,
}

export interface SchemaErrorList {
    errors: SchemaError[]
}

