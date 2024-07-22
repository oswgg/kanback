export type ErrorType = 'PayloadError' | 'UnknownError' | 'DuplicateError' | 'NotFoundError' | 'AuthorizationError'

export interface ErrorTypeDictionary {
    [key: string]: ErrorType
}
