const redirectReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_REDIRECT_URL':
    return action.payload
  default:
    return state
  }
}

export default redirectReducer
