import axios from "axios"

export const requestLogin = ({ state }, payload) => {
  console.log("requestLogin", state, payload)
  const url = "/auth/login"
  const body = payload
  return axios.post(url, body)
}

export const requestSignup = ({ state }, payload) => {
  console.log("requestSignup", state, payload)
  const url = "/users/account"
  const body = payload
  return axios.post(url, body)
}

export const requestCheckToken = async ({ state }) => {
  console.log("requestCheckToken", state)
  const url = "/auth/valiable"
  return axios.get(url, {
    headers: {
      Authorization: state.token,
    },
  })
}
