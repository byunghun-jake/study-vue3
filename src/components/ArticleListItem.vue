<template>
  <p>{{ title }}</p>
  <p>{{ desc }}</p>
</template>

<script>
export default {
  name: "ArticleListItem",
  props: {
    title: {
      type: String,
      default: "제목",
    },
    desc: {
      type: String,
      default:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  },
}
</script>

<style></style>
