<template>
  <section class="flex flex-col flex-1">
    <div class="signup-background">
      <div class="signup-container">
        <h1 class="text-2xl font-bold mb-4 justify-self-center">
          회원가입
        </h1>
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
            class="ml-auto cursor-help text-sm"
            @mouseenter="showPassword"
            @mouseleave="hidePassword"
          >
            여기 올리면 비밀번호 보임
          </span>
        </div>
        <Button
          :text="'회원가입하기'"
          :disabled="!signupValid"
          @click="onSignup"
        />
      </div>
      <div class="login-background-layer"></div>
    </div>
  </section>
</template>

<script>
import Input from "@/components/Input.vue"
import Button from "@/components/Button.vue"
import { computed, reactive } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export default {
  name: "Signup",
  components: { Input, Button },
  setup() {
    const store = useStore()
    const router = useRouter()
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

    const requiredValidation = (key) => {
      if (form[key].value.length < 1) {
        console.log(`필수 입력 요소입니다.`)
        form[key].errors.required = `필수 입력 요소입니다.`
        return false
      }
      if (form[key].errors.required) {
        delete form[key].errors.required
      }
    }

    const maxLengthValidation = (key, maxLength = 1) => {
      if (form[key].value.length >= maxLength) {
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
      if (!form.password2.value) {
        return true
      }
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
    const onPositionUpdate = () => {
      maxLengthValidation("position", 30)
    }
    const onNameUpdate = () => {
      maxLengthValidation("name", 30)
      requiredValidation("name")
    }
    const onUserIdUpdate = () => {
      maxLengthValidation("userId", 16)
      requiredValidation("userId")
    }
    const onPasswordUpdate = () => {
      minLengthValidation("password", 9)
      maxLengthValidation("password", 16)
      requiredValidation("password")
      passwordMatchValidation()
    }
    const onPassword2Update = () => {
      minLengthValidation("password2", 9)
      maxLengthValidation("password2", 16)
      requiredValidation("password2")
      passwordMatchValidation()
    }

    const showPassword = () => {
      form.password.type = "text"
      form.password2.type = "text"
    }

    const hidePassword = () => {
      form.password.type = "password"
      form.password2.type = "password"
    }

    const signupValid = computed(() => {
      return Object.keys(form).every((key) => {
        return Object.keys(form[key].errors).length === 0
      })
    })

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
        await store.dispatch("root/requestSignup", formData)
        const loginFormData = {
          userId: form.userId.value,
          password: form.password.value,
        }
        const res = await store.dispatch("root/requestLogin", loginFormData)
        console.log(res)
        store.commit("root/SET_TOKEN", res.data.accessToken)
        store.commit("root/SET_USERID", res.data.userId)
        router.push({ name: "Home" })
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
      signupValid,
    }
  },
}
</script>

<style scoped lang="scss">
.signup-background {
  background: url("../assets/loginBG.jpg");
  @apply relative w-full h-full pt-10 bg-center bg-contain;
}
.login-background-layer {
  background: rgba($color: #000000, $alpha: 0.3);
  @apply absolute inset-0;
}
.signup-container {
  @apply max-w-md w-full bg-white mx-auto py-10 px-4 shadow-lg rounded grid gap-6 relative z-10;
}
</style>
