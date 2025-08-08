const AUTH_URL = 'auth/'

export const USER_API = {
	GET_PROFILE: `${AUTH_URL}profile`,
	UPDATE_PROFILE: `${AUTH_URL}profile`,
	CHANGE_PASSWORD: `${AUTH_URL}profile/change-password`,
	ACTION_BY_ID: (id: string) => `${AUTH_URL}${id}`,
	TOGGLE_STATUS: (id: string) => `${AUTH_URL}${id}/toggle-status`
}
