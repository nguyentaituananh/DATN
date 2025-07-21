'use strict'

const StatusCode = {
	FORBIDDEN: 403,
	CONFLICT: 409,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	BAD_REQUEST: 400
}

const ReasonStatusCode = {
	FORBIDDEN: 'Truy cập bị cấm',
	CONFLICT: 'Lỗi xung đột',
	UNAUTHORIZED: 'Không được ủy quyền',
	NOT_FOUND: 'Không tìm thấy',
	BAD_REQUEST: 'Yêu cầu không hợp lệ'
}

class ErrorResponse extends Error {
	constructor(message, status) {
		super(message)
		this.status = status
	}
}

class ConflictRequestError extends ErrorResponse {
	constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
		super(message, statusCode)
	}
}

class BadRequestError extends ErrorResponse {
	constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
		super(message, statusCode)
	}
}

class AuthFailureError extends ErrorResponse {
	constructor(message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
		super(message, statusCode)
	}
}

class NotFoundError extends ErrorResponse {
	constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
		super(message, statusCode)
	}
}

class ForBiddenError extends ErrorResponse {
	constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
		super(message, statusCode)
	}
}

export { ErrorResponse, ConflictRequestError, BadRequestError, AuthFailureError, NotFoundError, ForBiddenError }
