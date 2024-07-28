export interface SchemaError {
    field: string,
    message: string
}

export interface SchemaErrorList {
    statusCode: 500;
    message: 'Error in payload validation';
    content: {
        type: 'PayloadError';
        errors?: SchemaError[];
    }
}

