<script setup lang="ts">
defineProps<{
  data: Record<string, unknown>
}>()
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="header">
        <div>
          <h1>{{ data.title[0] }}</h1>
          <p>&copy; {{ data.copyright[0] }}</p>
        </div>
        <img
          :src="data.qrcode"
          alt="QR Code"
        />
      </div>
      <div class="content-wrapper">
        <div
          class="content"
          style="
            animation:
              1s ease-in-out 0s 1 normal forwards slide-in,
              1s ease-in-out 10s 1 normal forwards slide-out;
          "
        >
          <div
            v-for="item in data.item.splice(0, 3)"
            :key="item.guid || item.title"
            class="item"
          >
            <div v-html="item['content:encoded']"></div>
          </div>
        </div>
        <div
          class="content"
          style="
            animation:
              1s ease-in-out 10s 1 normal forwards slide-in,
              1s ease-in-out 20s 1 normal forwards slide-out;
          "
        >
          <div
            v-for="item in data.item.splice(0, 3)"
            :key="item.guid || item.title"
            class="item"
          >
            <div v-html="item['content:encoded']"></div>
          </div>
        </div>
        <div
          class="content"
          style="
            animation:
              1s ease-in-out 20s 1 normal forwards slide-in,
              1s ease-in-out 30s 1 normal forwards slide-out;
          "
        >
          <div
            v-for="item in data.item.splice(0, 3)"
            :key="item.guid || item.title"
            class="item"
          >
            <div v-html="item['content:encoded']"></div>
          </div>
        </div>
        <div
          class="content"
          style="
            animation:
              1s ease-in-out 30s 1 normal forwards slide-in,
              1s ease-in-out 40s 1 normal forwards slide-out;
          "
        >
          <div
            v-for="item in data.item.splice(0, 3)"
            :key="item.guid || item.title"
            class="item"
          >
            <div v-html="item['content:encoded']"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  overflow: hidden;
}

main {
  width: 100vw;
  height: 100vh;
  font-family: sans-serif;
  background-color: #082f49;
  color: #f0f9ff;
  overflow: hidden;
}

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 3rem;
  line-height: 1;
  margin-top: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 6rem;
  flex-grow: 0;
  background-color: #0c4a6e;
  position: relative;
  z-index: 100;
}

.content-wrapper {
  position: relative;
  flex-grow: 1;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  justify-content: center;
  align-items: start;
  padding: 0rem 6rem;
  transform: translateY(100%);
}

.item {
  display: flex;
  align-items: start;
  font-size: 1.5rem;
}

img {
  max-width: 100%;
}

@keyframes slide-in {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0%);
  }
}

@keyframes slide-out {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(-100%);
  }
}
</style>
