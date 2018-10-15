import {SET_AUTH_USER, ADD_LIST} from '../actions/authUserActions'

const authUserReducer = (state = null, {type, payload}) => {
  switch(type) {
    case SET_AUTH_USER:
      return payload.user
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, payload.list]
      }
    default:
      return state
  }
}

export default authUserReducer