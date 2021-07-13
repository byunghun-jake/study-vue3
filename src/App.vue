<template>
  <div class="h-screen flex flex-col relative">
    <div class="bg-gray-200 p-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <div class="flex flex-1 max-h-screen overflow-scroll">
      <aside
        class="w-64 transition-all flex-shrink-0 h-full bg-teal-100 pt-10 relative flex flex-col"
      >
        <div class="self-center flex flex-col items-center">
          <div class="w-20 h-20 rounded-full bg-yellow-200 mb-2">
            이미지
          </div>
          <p class="font-bold">김병훈</p>
          <p class="text-sm">구미 2반 7팀 팀원</p>
        </div>
        <button></button>
      </aside>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
}
</script>

<style lang="scss"></style>
