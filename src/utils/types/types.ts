export type ErrorType = 'PayloadError' | 'UnknownError' | 'DuplicateError'

export interface ErrorTypeDictionary {
    [key: string]: ErrorType
}
