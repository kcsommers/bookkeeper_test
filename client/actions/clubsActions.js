export const SET_CLUBS = 'clubs:setClubs'
export const ADD_CLUB = 'clubs:addClub'
export const ADD_POST = 'clubs:addPost'
export const DELETE_CLUB = 'clubs:deleteClub'

export const setClubs = (clubs) => ({
  type: SET_CLUBS,
  payload: {clubs}
})

export const addClub = (club) => ({
  type: ADD_CLUB,
  payload: {club}
})

export const deleteClub = (clubId) => ({
  type: DELETE_CLUB,
  payload: {clubId}
})

export const addPost = (post) => ({
  type: ADD_POST,
  payload: {post}
})