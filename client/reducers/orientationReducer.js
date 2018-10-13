import {ORIENTATION_CHANGE} from '../actions/orientationActions'

const orientationReducer = (state = '', {type, payload}) => {
  switch(type) {
    case ORIENTATION_CHANGE: 
      return payload.orientation
    default:
      return state
  }
}

export default orientationReducer