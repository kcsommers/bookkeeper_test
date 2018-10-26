import {
  SET_CLUBS,
  ADD_CLUB,
  DELETE_CLUB,
  ADD_POST
} from '../actions/clubsActions'

const clubsReducer = (state = [], {type, payload}) => {
  let clubIndex, clubUpdated
  switch(type) {
    case SET_CLUBS:
      return payload.clubs
    case ADD_CLUB:
      return [payload.club, ...state]
    case DELETE_CLUB:
      clubIndex = state.findIndex((clubObj) => clubObj.id === payload.clubId)
      return [...state.slice(0, clubIndex), ...state.slice(clubIndex + 1)]
    case ADD_POST:
      const clubIndex = state.findIndex((clubObj) => clubObj.id === payload.post.clubId)
      const clubUpdated = state.find((clubObj) => clubObj.id === payload.post.clubId)
      clubUpdated.posts.push(payload.post)
      return [
        ...state.slice(0, clubIndex),
        clubUpdated,
        ...state.slice(clubIndex + 1)
      ]
    default:
      return state
  }
}

export default clubsReducer