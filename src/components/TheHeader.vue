<template>
  <header class="bg-white border-b p-4 flex justify-between items-center">
    <ul class="flex">
      <li>
        <router-link
          :to="{ name: 'Home' }"
          class="py-2 px-4 rounded hover:bg-gray-100"
          >Home</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'Room', params: { id: 1 } }"
          class="py-2 px-4 rounded hover:bg-gray-100"
        >
          Room
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'About' }"
          class="py-2 px-4 rounded hover:bg-gray-100"
          >About</router-link
        >
      </li>
    </ul>
    <div>
      <li v-if="!userLoggedIn">
        <router-link
          :to="{ name: 'Login' }"
          class="py-2 px-4 bg-white rounded inline-block hover:bg-gray-100"
        >
          Login
        </router-link>
      </li>
      <li v-else>
        <button
          @click="onLogout"
          class="py-2 px-4 bg-white rounded inline-block hover:bg-gray-100"
        >
          Logout
        </button>
      </li>
    </div>
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
    }

    return {
      userLoggedIn,
      onLogout,
    }
  },
}
</script>

<style scoped lang="scss">
li {
  @apply inline-block mr-2 font-bold;
}
</style>
