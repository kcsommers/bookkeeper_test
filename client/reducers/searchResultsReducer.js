import {SET_SEARCH_RESULTS} from '../actions/searchResultsActions'

const searchResultsReducer = (state = [], {type, payload}) => {
  switch(type) {
    case SET_SEARCH_RESULTS:
      return payload.results
    default:
      return state
  }
}

export default searchResultsReducer