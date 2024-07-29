<script setup lang="ts">
defineProps<{
  data: { url: string }
}>()
</script>

<template>
  <main>
    <iframe :src="data.url"></iframe>
  </main>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #000;
  color: #fff;
  width: 100vw;
  height: 100vh;
}

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
