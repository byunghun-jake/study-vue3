<template>
  <button
    class="py-3 px-4  text-white w-full font-bold rounded"
    :class="{ 'bg-gray-600': disabled, 'bg-teal-600': !disabled }"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    disabled: Boolean,
  },
}
</script>

<style></style>
