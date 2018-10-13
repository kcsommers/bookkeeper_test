export const SET_AUTH_USER = 'authUser:setAuthUser'

export const setAuthUser = (user) => ({
	type: SET_AUTH_USER,
	payload: {user}
})