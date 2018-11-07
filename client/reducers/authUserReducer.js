import {
  SET_AUTH_USER,
  UPDATE_USER
} from '../actions/authUserActions'

const authUserReducer = (state = null, {type, payload}) => {
  switch(type) {
    case SET_AUTH_USER:
      return payload.user
    case UPDATE_USER:
      console.log("USER REDUCEER")
      let userCopy = state
      for(key in payload.newData) {
        userCopy[key] = payload.newData[key]
      }
      return userCopy
    default:
      return state
  }
}

export default authUserReducer