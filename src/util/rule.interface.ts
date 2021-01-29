
export interface IResponse {
    message: string;
    status: string;
    data: {
        name: string,
        github: string,
        email: string,
        mobile: string,
        twitter: string
    } | null,
    statusCode?: number | any
}

export interface IValidationResponse {
    "validation": {
        error: string,
        field: string,
        field_value: string,
        condition: string,
        condition_value: string
    }
}

export interface IRule {
    field: string,
    condition: string,
    conditionValue: string
}