<template>
  <div>
    <p>ChildInput</p>
    <input
      class="border border-gray-800"
      type="text"
      v-bind:value="yellow"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  name: "ChildInput",
  props: {
    yellow: {
      type: String,
    },
  },
  methods: {
    onInput(event) {
      this.$emit("OMG", event.target.value)
    },
  },
}
</script>

<style></style>
