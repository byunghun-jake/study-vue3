export const SET_TOKEN = (state, token) => {
  state.accessToken = token
  if (!token) {
    window.localStorage.removeItem("accessToken")
  } else {
    window.localStorage.setItem("accessToken", token)
  }
}

export const SET_USERID = (state, userId) => {
  state.userId = userId
  window.localStorage.setItem("userId", userId)
}

export const SET_LOGIN_REQUIRED_MODAL = (state, payload) => {
  state.showLoginRequiredModal = payload
}
