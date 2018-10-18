import {
  SET_AUTH_USER, 
  ADD_LIST,
  ADD_BOOK,
  ADD_QUOTE,
  ADD_NOTE
} from '../actions/authUserActions'

const authUserReducer = (state = null, {type, payload}) => {
  let list, listsFiltered, book, booksFiltered
  switch(type) {
    case SET_AUTH_USER:
      return payload.user
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, payload.list]
      }
    case ADD_BOOK:
      list = state.lists.filter((list) => list.id === payload.listId)
      listsFiltered = state.lists.filter((list) => list.id !== payload.listId)
      list[0].books.push(payload.bookData)
      return {
        ...state,
        lists: [list, listsFiltered]
      }
    case ADD_QUOTE:
      list = state.lists.filter((list) => list.id === payload.book.listsBooks.listId)
      listsFiltered = state.lists.filter((list) => list.id !== payload.book.listsBooks.listId)

      book = list[0].books.filter((book) => book.id === payload.book.id)
      booksFiltered = list[0].books.filter((book) => book.id !== payload.book.id)

      book[0].quotes.push(payload.quote)
      booksFiltered.unshift(book[0])
      list[0].books = booksFiltered

      return {
        ...state,
        lists: [list, listsFiltered]
      }

    case ADD_NOTE:
      list = state.lists.filter((list) => list.id === payload.book.listsBooks.listId)
      listsFiltered = state.lists.filter((list) => list.id !== payload.book.listsBooks.listId)

      book = list[0].books.filter((book) => book.id === payload.book.id)
      booksFiltered = list[0].books.filter((book) => book.id !== payload.book.id)

      book[0].notes.push(payload.note)
      booksFiltered.unshift(book[0])
      list[0].books = booksFiltered

      return {
        ...state,
        lists: [list, listsFiltered]
      }

    default:
      return state
  }
}

export default authUserReducer