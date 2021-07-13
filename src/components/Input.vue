<template>
  <div class="grid gap-2">
    <label :for="`${label}-label`">{{ label }}</label>
    <input
      :id="`${label}-label`"
      class="border py-2 px-4 rounded-sm"
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
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
  },
}
</script>

<style></style>
