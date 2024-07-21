
export interface SchemaError {
    field: string,
    message: string
}

export interface SchemaErrorList {
    errors: SchemaError[]
}

