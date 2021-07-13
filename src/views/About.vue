<template>
  <div>
    <p>ParentValue</p>
    <input class="border border-gray-800" type="text" v-model="parentValue" />
    <hr />
    <ChildInput @OMG="potato" :yellow="childValue" />
  </div>
</template>

<script>
import ChildInput from "@/components/ChildInput.vue"
export default {
  components: {
    ChildInput,
  },
  data() {
    return {
      parentValue: "",
      childValue: "",
    }
  },
  methods: {
    potato(value) {
      this.childValue = value
    },
  },
}
</script>

<style></style>
