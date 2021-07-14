import axios from "axios"

axios.defaults.baseURL = "/api/v1"
axios.defaults.headers["Content-Type"] = "application/json"

export default { axios }
