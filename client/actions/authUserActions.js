export const SET_AUTH_USER = 'authUser:setAuthUser'
export const ADD_LIST = 'authUser:addList'
export const ADD_BOOK = 'authUser:addBook'
export const ADD_QUOTE = 'authUser:addQuote'
export const ADD_NOTE = 'authUser:addNote'

export const setAuthUser = (user) => ({
	type: SET_AUTH_USER,
	payload: {user}
})

export const addList = (list) => ({
  type: ADD_LIST,
  payload: {list}
})

export const addBook = (bookData, listId) => ({
  type: ADD_BOOK,
  payload: {bookData, listId}
})

export const addQuote = (quote, book) => ({
  type: ADD_QUOTE,
  payload: {quote, book}
})

export const addNote = (note, book) => ({
  type: ADD_NOTE,
  payload: {note, book}
})