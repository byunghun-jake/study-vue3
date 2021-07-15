<template>
  <section class="flex flex-col flex-1 ">
    <div class="login-background">
      <div class="login-container">
        <h1 class="text-2xl font-bold mb-6 justify-self-center">
          LOGIN
        </h1>
        <Input
          :label="form.userId.label"
          :type="form.userId.type"
          v-model.trim="form.userId.value"
        />
        <div class="grid gap-1">
          <Input
            :label="form.password.label"
            :type="form.password.type"
            v-model.trim="form.password.value"
          />
          <span
            class="ml-auto cursor-help text-sm"
            @mouseenter="showPassword"
            @mouseleave="hidePassword"
          >
            여기 올리면 비밀번호 보임
          </span>
        </div>
        <Button :text="'로그인하기'" :disabled="!isValid" @click="onLogin" />
        <router-link class="mx-auto" :to="{ name: 'Signup' }">
          회원가입
        </router-link>
      </div>
      <div class="login-background-layer"></div>
    </div>
  </section>
</template>

<script>
import { computed, reactive } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import Input from "@/components/Input.vue"
import Button from "@/components/Button.vue"
export default {
  components: { Input, Button },
  name: "Login",
  setup() {
    const store = useStore()
    const router = useRouter()
    const form = reactive({
      userId: {
        value: "",
        type: "text",
        label: "아이디",
      },
      password: {
        value: "",
        type: "password",
        label: "비밀번호",
      },
    })

    const isValid = computed(() => form.userId.value && form.password.value)

    const onLogin = async () => {
      console.log(form.userId.value, form.password.value)
      try {
        const res = await store.dispatch("root/requestLogin", {
          userId: form.userId.value,
          password: form.password.value,
        })
        console.log(res)
        store.commit("root/SET_TOKEN", res.data.accessToken)
        store.commit("root/SET_USERID", res.data.userId)
        router.push({ name: "Home" })
      } catch (error) {
        alert(error)
      }
    }

    const showPassword = () => {
      form.password.type = "text"
    }
    const hidePassword = () => {
      form.password.type = "password"
    }

    return {
      form,
      isValid,
      onLogin,
      showPassword,
      hidePassword,
    }
  },
}
</script>

<style scoped lang="scss">
.login-background {
  background: url("../assets/loginBG.jpg");
  @apply relative w-full h-full pt-20 bg-center bg-contain;
}
.login-background-layer {
  background: rgba($color: #000000, $alpha: 0.3);
  @apply absolute inset-0;
}
.login-container {
  @apply w-96 bg-white mx-auto py-10 px-4 shadow-lg rounded grid gap-6 relative z-10;
}
</style>
