// Error schemas
export interface ValidationError {
	loc: (string | number)[]
	msg: string
	type: string
}

export interface HTTPValidationError {
	detail: ValidationError[]
}

export interface NotFoundExceptionModel {
	detail: string
}
