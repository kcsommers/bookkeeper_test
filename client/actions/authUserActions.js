export const SET_AUTH_USER = 'authUser:setAuthUser'
export const UPDATE_USER = 'authUser:updateUser'

export const setAuthUser = (user) => ({
	type: SET_AUTH_USER,
	payload: {user}
})

export const updateUser = (userId, newData) => ({
  type: UPDATE_USER,
  payload: {userId, newData}
})