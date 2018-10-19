export const SET_LISTS = 'lists:setLists'
export const ADD_LIST = 'lists:addList'
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

export const addQuote = (quote, bookId, listId) => ({
  type: ADD_QUOTE,
  payload: {quote, bookId, listId}
})

export const addNote = (note, bookId, listId) => ({
  type: ADD_NOTE,
  payload: {note, bookId, listId}
})