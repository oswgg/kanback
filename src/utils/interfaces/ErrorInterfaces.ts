export interface ModelError {
    model: string,
    message: string,
    props: {
        [key: string]: any
    }
}

