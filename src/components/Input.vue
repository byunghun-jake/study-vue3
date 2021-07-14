<template>
  <div class="grid gap-2" :class="{ required: required }">
    <label v-if="label" :for="`${label}-label`" class="relative">{{
      label
    }}</label>
    <input
      :id="`${label}-label`"
      class="border py-2 px-4 rounded-sm"
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-for="error in errors" :key="error" class="text-sm text-red-900 mb-2">
      <i class="fas fa-exclamation-circle"></i>
      <span class="inline-block font-bold ml-1">{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: {
      default: "",
      type: String,
    },
    type: {
      default: "",
      type: String,
    },
    modelValue: {
      default: "",
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
    errors: {
      type: Object,
    },
  },
}
</script>

<style scoped lang="scss">
.required {
  label:before {
    content: "";
    @apply absolute -top-1 -left-1 w-1 h-1 bg-red-600;
  }
}
</style>
