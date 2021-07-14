import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
// import store from "@/store"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach(async (to, from) => {
//   console.log(to, from)
//   // 토큰이 있으면 토큰 값이 참인지 확인합니다.
//   const token = window.localStorage.getItem("accessToken")
//   if (token) {
//     const res = await store.dispatch("root/requestCheckToken")
//     console.log(res)
//     // console.log(store.state.root)
//   }
//   return true
// })

export default router
