import axios from "axios"

axios.defaults.baseURL = "/api"
axios.defaults.headers["Content-Type"] = "application/json"

export default { axios }
