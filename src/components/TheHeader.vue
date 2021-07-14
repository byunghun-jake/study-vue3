<template>
  <header class="bg-gray-200 p-4">
    <ul class="flex">
      <li>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'About' }">About</router-link>
      </li>
      <li v-if="!userLoggedIn">
        <router-link :to="{ name: 'Login' }">
          Login
        </router-link>
      </li>
      <li v-else>
        <button @click="onLogout">Logout</button>
      </li>
      <li>
        <button @click="onCheckToken">CheckToken</button>
      </li>
    </ul>
  </header>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  name: "TheHeader",
  setup() {
    const store = useStore()
    const userLoggedIn = computed(() => store.getters["root/userLoggedIn"])

    const onLogout = () => {
      store.commit("root/SET_TOKEN", null)
      store.commit("root/SET_USERID", null)
    }

    const onCheckToken = () => {
      store.dispatch("root/requestCheckToken")
    }
    return {
      userLoggedIn,
      onLogout,
      onCheckToken,
    }
  },
}
</script>

<style scoped lang="scss">
li {
  @apply inline-block mr-2;
}
</style>
