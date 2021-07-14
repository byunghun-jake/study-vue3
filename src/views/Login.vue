<template>
  <section class="px-4 py-6 flex flex-col flex-1">
    <h1 class="text-2xl font-bold mb-6">
      LOGIN
    </h1>
    <div class="container bg-red-200">
      <div
        class="w-96 bg-white mx-auto py-10 px-4 shadow-lg rounded grid gap-6"
      >
        <Input
          :label="form.email.label"
          :type="form.email.type"
          v-model.trim="form.email.value"
        />
        <div class="grid gap-1">
          <Input
            :label="form.password.label"
            :type="form.password.type"
            v-model.trim="form.password.value"
          />
          <span
            class="ml-auto cursor-help"
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
    </div>
  </section>
</template>

<script>
import { computed, reactive } from "vue"
import { useStore } from "vuex"
import Input from "@/components/Input.vue"
import Button from "@/components/Button.vue"
export default {
  components: { Input, Button },
  name: "Login",
  setup() {
    const store = useStore()
    const form = reactive({
      email: {
        value: "",
        type: "email",
        label: "이메일",
      },
      password: {
        value: "",
        type: "password",
        label: "비밀번호",
      },
    })

    const isValid = computed(() => form.email.value && form.password.value)

    const onLogin = async () => {
      console.log(form.email.value, form.password.value)
      try {
        // const res = await store.dispatch("root/requestLogin", {
        //   email: form.email.value,
        //   password: form.password.value,
        // })
        // alert(`accessToken: ${res.data.accessToken}`)

        store
          .dispatch("root/requestLogin", {
            email: form.email.value,
            password: form.password.value,
          })
          .then((res) => alert(`accessToken: ${res.data.accessToken}`))
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

<style></style>
