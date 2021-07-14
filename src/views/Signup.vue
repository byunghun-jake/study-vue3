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
          :label="form.belong.label"
          :type="form.belong.type"
          :required="form.belong.required"
          :errors="form.belong.errors"
          v-model.trim="form.belong.value"
          @update:modelValue="onBelongUpdate"
        />
        <Input
          :label="form.position.label"
          :type="form.position.type"
          :required="form.position.required"
          :errors="form.position.errors"
          v-model.trim="form.position.value"
          @update:modelValue="onPositionUpdate"
        />
        <Input
          :label="form.name.label"
          :type="form.name.type"
          :required="form.name.required"
          :errors="form.name.errors"
          v-model.trim="form.name.value"
          @update:modelValue="onNameUpdate"
        />
        <Input
          :label="form.userId.label"
          :type="form.userId.type"
          :required="form.userId.required"
          :errors="form.userId.errors"
          v-model.trim="form.userId.value"
          @update:modelValue="onUserIdUpdate"
        />
        <div class="grid gap-1">
          <Input
            :label="form.password.label"
            :type="form.password.type"
            :required="form.password.required"
            :errors="form.password.errors"
            v-model.trim="form.password.value"
            @update:modelValue="onPasswordUpdate"
          />
          <Input
            :type="form.password2.type"
            :required="form.password2.required"
            :errors="form.password2.errors"
            v-model.trim="form.password2.value"
            @update:modelValue="onPassword2Update"
          />
          <span
            class="ml-auto cursor-help"
            @mouseenter="showPassword"
            @mouseleave="hidePassword"
          >
            여기 올리면 비밀번호 보임
          </span>
        </div>
        <Button :text="'회원가입하기'" @click="onSignup" />
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
import { reactive } from "vue"
import { useStore } from "vuex"
export default {
  name: "Signup",
  components: { Input, Button },
  setup() {
    const store = useStore()
    const form = reactive({
      belong: {
        label: "소속",
        type: "text",
        value: "",
        errors: {},
        required: false,
      },
      position: {
        label: "직책",
        type: "text",
        value: "",
        errors: {},
        required: false,
      },
      name: {
        label: "이름",
        type: "text",
        value: "",
        errors: {},
        required: true,
      },
      userId: {
        label: "아이디",
        type: "text",
        value: "",
        errors: {},
        required: true,
      },
      password: {
        label: "비밀번호",
        type: "password",
        value: "",
        errors: {},
        required: true,
      },
      password2: {
        label: "비밀번호 확인",
        type: "password",
        value: "",
        errors: {},
        required: true,
      },
    })
    const maxLengthValidation = (key, maxLength = 1) => {
      if (form[key].value.length > maxLength) {
        console.log(`최대 ${maxLength}자까지 입력 가능합니다.`)
        form[key].errors.maxLength = `최대 ${maxLength}자까지 입력 가능합니다.`
        return false
      }
      if (form[key].errors.maxLength) {
        delete form[key].errors.maxLength
      }
    }

    const minLengthValidation = (key, minLength = 1) => {
      if (form[key].value.length <= minLength) {
        console.log(`최대 ${minLength}자까지 입력 가능합니다.`)
        form[key].errors.minLength = `최소 ${minLength}자 이상 입력해주세요.`
        return false
      }
      if (form[key].errors.minLength) {
        delete form[key].errors.minLength
      }
    }

    const passwordMatchValidation = () => {
      if (form.password.value !== form.password2.value) {
        form.password2.errors.misMatch = `비밀번호가 일치하지 않습니다.`
        return false
      }
      if (form.password2.errors.misMatch) {
        delete form.password2.errors.misMatch
      }
    }

    const onBelongUpdate = () => {
      maxLengthValidation("belong", 30)
    }
    const onPositionUpdate = (e) => {
      maxLengthValidation("position", 30)
      console.log(e)
    }
    const onNameUpdate = (e) => {
      maxLengthValidation("name", 30)
      console.log(e)
    }
    const onUserIdUpdate = (e) => {
      maxLengthValidation("userId", 16)
      console.log(e)
    }
    const onPasswordUpdate = (e) => {
      minLengthValidation("password", 9)
      maxLengthValidation("password", 16)
      passwordMatchValidation()
      console.log(e)
    }
    const onPassword2Update = (e) => {
      minLengthValidation("password2", 9)
      maxLengthValidation("password2", 16)
      passwordMatchValidation()
      console.log(e)
    }

    const showPassword = () => {
      form.password.type = "text"
      form.password2.type = "text"
    }

    const hidePassword = () => {
      form.password.type = "password"
      form.password2.type = "password"
    }

    const onSignup = async () => {
      const formData = {}
      Object.keys(form).forEach((key) => {
        if (key === "password2") {
          return
        }
        formData[key] = form[key].value
      })
      console.log(formData)
      try {
        const res = await store.dispatch("root/requestSignup", formData)
        console.log(res)
      } catch (error) {
        alert(error)
      }
    }

    return {
      form,
      onBelongUpdate,
      onPositionUpdate,
      onNameUpdate,
      onUserIdUpdate,
      onPasswordUpdate,
      onPassword2Update,
      showPassword,
      hidePassword,
      onSignup,
    }
  },
}
</script>

<style></style>
