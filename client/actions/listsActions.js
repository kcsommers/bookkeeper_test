export const SET_LISTS = 'lists:setLists'
export const ADD_LIST = 'lists:addList'
export const UPDATE_LIST = 'lists:updateList'
export const DELETE_LIST = 'lists:deleteList'
export const ADD_BOOK = 'lists:addBook'
export const UPDATE_BOOK = 'lists:updateBook'
export const DELETE_BOOK = 'lists:deleteBook'
export const ADD_QUOTE = 'lists:addQuote'
export const ADD_NOTE = 'lists:addNote'

export const setLists = (lists) => ({
  type: SET_LISTS,
  payload: {lists}
})

export const addList = (list) => ({
  type: ADD_LIST,
  payload: {list}
})

export const updateList = (listData) => ({
  type: UPDATE_LIST,
  payload: {listData}
})

export const deleteList = (listId) => ({
  type: DELETE_LIST,
  payload: {listId}
})

export const addBook = (book, listId) => ({
  type: ADD_BOOK,
  payload: {book, listId}
})

export const updateBook = (bookData, listId) => ({
  type: UPDATE_BOOK,
  payload: {bookData, listId}
})

export const deleteBook = (bookId, listId) => ({
  type: DELETE_BOOK,
  payload: {bookId, listId}
})

export const addQuote = (quote, bookId, listId) => ({
  type: ADD_QUOTE,
  payload: {quote, bookId, listId}
})

export const addNote = (note, bookId, listId) => ({
  type: ADD_NOTE,
  payload: {note, bookId, listId}
})