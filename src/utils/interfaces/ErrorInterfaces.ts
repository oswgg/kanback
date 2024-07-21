
export default interface DuplicateError {
    model: string,
    message: string,
    props: {
        [key: string]: any
    }
}

