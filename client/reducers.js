const state = {
  orientation: 'portrait'
}

export const reducers = (state = state, action) => {
  switch(action.type) {
    case 'ORIENTATION_CHANGE':
      console.log(state.orientation)
      return state;
    default:
      return state;
  } 
}