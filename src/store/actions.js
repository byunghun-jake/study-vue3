import axios from "axios"

export const requestLogin = ({ state }, payload) => {
  console.log("requestLogin", state, payload)
  const url = "/auth/login"
  const body = payload
  return axios.post(url, body)
}
