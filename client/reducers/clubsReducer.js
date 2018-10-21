import {
  SET_CLUBS,
  ADD_POST
} from '../actions/clubsActions'

const clubsReducer = (state = [], {type, payload}) => {
  switch(type) {
    case SET_CLUBS:
      return payload.clubs
    case ADD_POST:
      console.log(payload.post.clubId)
      const clubIndex = state.findIndex((clubObj) => clubObj.id === payload.post.clubId)
      console.log(clubIndex)
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