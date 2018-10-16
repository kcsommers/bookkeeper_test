import {
  SET_AUTH_USER, 
  ADD_LIST,
  ADD_BOOK
} from '../actions/authUserActions'

const authUserReducer = (state = null, {type, payload}) => {
  switch(type) {
    case SET_AUTH_USER:
      return payload.user
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, payload.list]
      }
    case ADD_BOOK:
      const list = state.lists.filter((list) => list.id === payload.listId)
      const listsFiltered = state.lists.filter((list) => list.id !== payload.listId)
      list[0].books.push(payload.bookData)
      return {
        ...state,
        list: [list, listsFiltered]
      }
    default:
      return state
  }
}

export default authUserReducer