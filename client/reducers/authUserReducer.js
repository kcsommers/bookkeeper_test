import {SET_AUTH_USER} from '../actions/authUserActions'

const authUserReducer = (state = null, {type, payload}) => {
  switch(type) {
    case SET_AUTH_USER:
      return payload.user
    default:
      return state
  }
}

export default authUserReducer