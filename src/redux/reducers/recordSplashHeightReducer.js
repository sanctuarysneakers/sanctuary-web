const recordSplashHeightReducer = (state = 0, action) => {
  switch (action.type) {
    case 'RECORD_SPLASH_HEIGHT':
      return action.payload
    default:
      return state
  }
}

export default recordSplashHeightReducer
