export const userLoggedIn = (state) => {
  if (state.accessToken) {
    return true
  }
  return false
}

export const accessToken = (state) => {
  return state.accessToken
}

export const showLoginRequiredModal = (state) => {
  return state.showLoginRequiredModal
}
