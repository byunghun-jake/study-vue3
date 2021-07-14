export const SET_TOKEN = (state, token) => {
  state.token = token
  window.localStorage.setItem("accessToken", token)
}

export const SET_USERID = (state, userId) => {
  state.userId = userId
  window.localStorage.setItem("userId", userId)
}
