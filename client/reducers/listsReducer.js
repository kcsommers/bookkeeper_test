import {
  SET_LISTS,
  ADD_LIST,
  ADD_QUOTE,
  ADD_NOTE
} from '../actions/listsActions'

const listsReducer = (state = [], {type, payload}) => {
  let listIndex, bookIndex, bookUpdated, listUpdated
  switch(type) {
    case SET_LISTS:
      return payload.lists
    case ADD_LIST:
      return [payload.list, ...state]
    case ADD_QUOTE:
      listIndex = state.findIndex((listObj) => listObj.id === payload.listId)
      bookIndex = state[listIndex].books.findIndex((bookObj) => bookObj.id === payload.bookId)

      bookUpdated = state[listIndex].books.find((bookObj) => bookObj.id === payload.bookId)
      bookUpdated.quotes.push(payload.quote)

      listUpdated = state.find((listObj) => listObj.id === payload.listId)
      listUpdated.books = [
        ...listUpdated.books.slice(0, bookIndex),
        bookUpdated,
        ...listUpdated.books.slice(bookIndex + 1)
      ]

      return [
        ...state.slice(0, listIndex),
        listUpdated,
        ...state.slice(listIndex + 1)
      ]
    case ADD_NOTE:
      listIndex = state.findIndex((listObj) => listObj.id === payload.listId)
      bookIndex = state[listIndex].books.findIndex((bookObj) => bookObj.id === payload.bookId)

      bookUpdated = state[listIndex].books.find((bookObj) => bookObj.id === payload.bookId)
      bookUpdated.notes.push(payload.note)

      listUpdated = state.find((listObj) => listObj.id === payload.listId)
      listUpdated.books = [
        ...listUpdated.books.slice(0, bookIndex),
        bookUpdated,
        ...listUpdated.books.slice(bookIndex + 1)
      ]

      return [
        ...state.slice(0, listIndex),
        listUpdated,
        ...state.slice(listIndex + 1)
      ]

    default: 
      return state
  }
}

export default listsReducer