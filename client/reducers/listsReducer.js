import {
  SET_LISTS,
  UPDATE_LIST,
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  ADD_LIST,
  DELETE_LIST,
  ADD_QUOTE,
  ADD_NOTE,
  DELETE_NOTE,
  DELETE_QUOTE
} from '../actions/listsActions'

const listsReducer = (state = [], {type, payload}) => {
  let listIndex, bookIndex, bookUpdated, listUpdated, noteIndex, quoteIndex, noteUpdated, quoteUpdated
  switch(type) {
    case SET_LISTS:
      return payload.lists
    case ADD_LIST:
      return [payload.list, ...state]
    case UPDATE_LIST:
      console.log(payload.listData.id)
      listIndex = state.findIndex((listObj) => listObj.id === payload.listData.id)

      listUpdated = state.find((listObj) => listObj.id === payload.listData.id)


      listUpdated.name = payload.listData.newData.name

      return [
        ...state.slice(0, listIndex),
        listUpdated,
        ...state.slice(listIndex + 1)
      ]
      
    case DELETE_LIST:
      listIndex = state.findIndex((listObj) => listObj.id === payload.listId)
      return [
        ...state.slice(0, listIndex),
        ...state.slice(listIndex + 1)
      ]
    case ADD_BOOK:
      listIndex = state.findIndex((listObj) => listObj.id === payload.listId)
      listUpdated = state.find((listObj) => listObj.id === payload.listId)
      listUpdated.books.push(payload.book)
      
      return [
        ...state.slice(0, listIndex),
        listUpdated,
        ...state.slice(listIndex + 1)
      ]
    case UPDATE_BOOK:
      listIndex = state.findIndex((listObj) => listObj.id === payload.listId)
      bookIndex = state[listIndex].books.findIndex((bookObj) => bookObj.id === payload.bookData.id)

      bookUpdated = state[listIndex].books.find((bookObj) => bookObj.id === payload.bookData.id)

      for(key in bookUpdated) {
        for(field in payload.bookData.newData) {
          if(key === field) {
            bookUpdated[key] = payload.bookData.newData[field]
            break
          }
        }
      }
      
      listUpdated = state.find((listObj) => listObj.id === payload.listId)
      console.log(bookIndex)
      console.log('NOT UPDATED', listUpdated.books)
      listUpdated.books = [
        ...listUpdated.books.slice(0, bookIndex),
        bookUpdated,
        ...listUpdated.books.slice(bookIndex + 1)
      ]

      console.log('UPDATED', listUpdated.books)

      return [
        ...state.slice(0, listIndex),
        listUpdated,
        ...state.slice(listIndex + 1)
      ]
    case DELETE_BOOK:
      listIndex = state.findIndex((listObj) => listObj.id === payload.listId)
      bookIndex = state[listIndex].books.findIndex((bookObj) => bookObj.id === payload.bookId)
      listUpdated = state.find((listObj) => listObj.id === payload.listId)
      listUpdated.books = [
        ...listUpdated.books.slice(0, bookIndex),
        ...listUpdated.books.slice(bookIndex + 1)
      ]

      return [
        ...state.slice(0, listIndex),
        listUpdated,
        ...state.slice(listIndex + 1)
      ]
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

    case DELETE_NOTE:
      listIndex = state.findIndex((listObj) => listObj.id === payload.listId)
      bookIndex = state[listIndex].books.findIndex((bookObj) => bookObj.id === payload.bookId)

      bookUpdated = state[listIndex].books.find((bookObj) => bookObj.id === payload.bookId)

      noteIndex = bookUpdated.notes.findIndex((noteObj) => noteObj.id === payload.noteId)

      bookUpdated.notes = [
        ...bookUpdated.notes.slice(0, noteIndex),
        ...bookUpdated.notes.slice(noteIndex + 1)
      ]

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

    case DELETE_QUOTE:
      listIndex = state.findIndex((listObj) => listObj.id === payload.listId)
      bookIndex = state[listIndex].books.findIndex((bookObj) => bookObj.id === payload.bookId)

      bookUpdated = state[listIndex].books.find((bookObj) => bookObj.id === payload.bookId)

      quoteIndex = bookUpdated.quotes.findIndex((quoteObj) => quoteObj.id === payload.quoteId)

      bookUpdated.quotes = [
        ...bookUpdated.quotes.slice(0, quoteIndex),
        ...bookUpdated.quotes.slice(quoteIndex + 1)
      ]

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