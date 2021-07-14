<template>
  <section class="px-4 py-6 flex flex-col flex-1">
    <h1 class="text-2xl font-bold mb-6">
      List
    </h1>
    <div class="overflow-scroll">
      <ul class="w-full grid grid-cols-4 gap-4">
        <li v-for="i in count" :key="i">
          <ArticleListItem />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { ref } from "@vue/reactivity"
import ArticleListItem from "../components/ArticleListItem.vue"
import { onMounted } from "@vue/runtime-core"
// @ is an alias to /src

export default {
  name: "Home",
  components: { ArticleListItem },
  props: {
    loading: Boolean,
  },
  setup(props, { emit }) {
    const count = ref(40)

    onMounted(() => {
      setTimeout(() => {
        emit("loading-update")
      }, 2000)
    })

    return {
      count,
    }
  },
}
</script>
