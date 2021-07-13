import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "./lib/axios"
import "./assets/tailwind.css"

createApp(App)
  .use(axios)
  .use(store)
  .use(router)
  .mount("#app")
