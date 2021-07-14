export const userLoggedIn = (state) => {
  if (state.token) {
    return true
  }
  return false
}
