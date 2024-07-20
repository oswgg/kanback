export type SchemaValidationError = 'Required' | 'Not Valid'

export interface SchemaValidationDictionary {
    [key: string]: SchemaValidationError
}

export type ErrorType = 'PayloadError' | 'UnknownError'

export interface ErrorTypeDictionary {
    [key: string]: ErrorType
}
