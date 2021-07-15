import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import store from "@/store"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Room/:id",
    name: "Room",
    component: () => import("../views/Room.vue"),
    props: true,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      authRequired: false,
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    meta: {
      authRequired: false,
    },
    component: () => import("../views/Signup.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  // console.log(to, from)
  // 세션 검증하기
  if (store.getters["root/accessToken"]) {
    try {
      await store.dispatch("root/requestCheckToken")
      // console.log(res)
    } catch (error) {
      // console.dir(error)
      if (error.response.status === 401) {
        alert("세션이 유효하지 않거나 만료되었습니다. 로그아웃 합니다.")
        store.commit("root/SET_TOKEN", null)
      } else if (error.response.status === 403) {
        alert("세션이 만료되었습니다. 로그아웃 합니다.")
      }
    }
  }

  // 로그인이 필요한 페이지 접근 관리
  const token = store.getters["root/accessToken"]
  if (to.meta.authRequired === false && token) {
    router.push({ name: "Home" })
  } else if (to.meta.authRequired === true && !token) {
    // 토큰이 존재하지 않는다면
    alert("로그인이 필요한 페이지입니다.")
    router.push({ name: "Login" })
  } else {
    return true
  }
})

export default router
