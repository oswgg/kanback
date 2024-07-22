export interface DuplicateError {
    model: string,
    message: string,
    props: {
        [key: string]: any
    }
}

export interface ModelError {
    model: string,
    message: string,
    props: {
        [key: string]: any
    }
}
