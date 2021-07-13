<template>
  <section class="px-4 py-6 flex flex-col flex-1">
    <h1 class="text-2xl font-bold mb-6">
      회원가입
    </h1>
    <div class="container bg-red-200">
      <div
        class="w-96 bg-white mx-auto py-10 px-4 shadow-lg rounded grid gap-6"
      >
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
          <Input
            :type="form.password2.type"
            v-model.trim="form.password2.value"
          />
          <span
            class="ml-auto cursor-help"
            @mouseenter="showPassword"
            @mouseleave="hidePassword"
          >
            여기 올리면 비밀번호 보임
          </span>
        </div>
        <Button :text="'회원가입하기'" />
        <router-link class="mx-auto" :to="{ name: 'Login' }">
          로그인
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Input from "@/components/Input.vue"
import Button from "@/components/Button.vue"
import { reactive } from "@vue/reactivity"
export default {
  name: "Signup",
  components: { Input, Button },
  setup() {
    const form = reactive({
      belong: {
        label: "소속",
        type: "text",
        value: "",
        required: false,
      },
      position: {
        label: "직책",
        type: "text",
        value: "",
        required: false,
      },
      name: {
        label: "이름",
        type: "text",
        value: "",
        required: true,
      },
      userId: {
        label: "아이디",
        type: "text",
        value: "",
        required: true,
      },
      password: {
        label: "비밀번호",
        type: "password",
        value: "",
        required: true,
      },
      password2: {
        label: "비밀번호 확인",
        type: "password",
        value: "",
        required: true,
      },
    })
    return {
      form,
    }
  },
}
</script>

<style></style>
