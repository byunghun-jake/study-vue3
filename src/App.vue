<template>
  <div class="h-screen flex flex-col relative">
    <TheHeader />
    <div class="flex flex-1 max-h-screen overflow-scroll">
      <aside class="aside" :class="{ active: asideActivated }">
        <div class="self-center flex flex-col items-center">
          <img class="" src="./assets/userProfile.jpg" />
        </div>
        <button
          class="absolute bottom-2 right-2 rounded bg-blue-300 py-2 px-4"
          @click="toggleAside"
        >
          <i class="fas fa-bars"></i>
        </button>
      </aside>
      <router-view> </router-view>
    </div>
  </div>
  <Modal v-if="showLoginRequiredModal" @close="closeModal">
    <template v-slot:header>
      <div>
        어라라?
      </div>
    </template>
    <template v-slot:body>
      <div>
        로그인이 필요한 페이지입니다.
      </div>
    </template>
  </Modal>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue"
import Modal from "@/components/Modal.vue"
import { computed, onBeforeMount, ref } from "vue"
import { useStore } from "vuex"
export default {
  components: {
    TheHeader,
    Modal,
  },
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      const token = window.localStorage.getItem("accessToken")
      if (token) {
        store.commit("root/SET_TOKEN", token)
      }
    })
    const asideActivated = ref(true)
    const showLoginRequiredModal = computed(() => {
      return store.getters["root/showLoginRequiredModal"]
    })

    const toggleAside = () => {
      asideActivated.value = !asideActivated.value
    }

    const closeModal = () => {
      store.commit("root/SET_LOGIN_REQUIRED_MODAL", false)
    }

    return { asideActivated, toggleAside, showLoginRequiredModal, closeModal }
  },
}
</script>

<style lang="scss">
.aside {
  @apply w-20 transition-all duration-500 flex-shrink-0 h-full border-r pt-10 relative flex flex-col;
  &.active {
    @apply w-64;
  }
  img {
    @apply w-12 h-12 transition-all delay-100 rounded-full bg-yellow-200 mb-2 object-center object-cover;
  }
  &.active img {
    @apply w-20 h-20;
  }
}
</style>
