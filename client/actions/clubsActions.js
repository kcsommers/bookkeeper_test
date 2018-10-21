export const SET_CLUBS = 'clubs:setClubs'
export const ADD_POST = 'clubs:addPost'

export const setClubs = (clubs) => ({
  type: SET_CLUBS,
  payload: {clubs}
})

export const addPost = (post) => ({
  type: ADD_POST,
  payload: {post}
})