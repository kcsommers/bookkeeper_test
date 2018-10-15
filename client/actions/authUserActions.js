export const SET_AUTH_USER = 'authUser:setAuthUser'
export const ADD_LIST = 'authUser:addList'

export const setAuthUser = (user) => ({
	type: SET_AUTH_USER,
	payload: {user}
})

export const addList = (list) => ({
  type: ADD_LIST,
  payload: {list}
})