export interface ILoginData {
	email: string
	password: string
}

export interface IUser {
	_id: string
	email: string
	name: string
	role: string
	is_active: boolean
}

export interface ILoginResponse {
	user: IUser
	tokens: {
		accessToken: string
		refreshToken: string
	}
}

export interface IApiError {
	response?: {
		data?: {
			message?: string
		}
	}
}