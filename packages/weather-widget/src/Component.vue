<script setup lang="ts">
defineProps<{
  data: Record<string, any>
}>()
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="header">
        <div>
          <h1>Wetter in {{ data.current.name }}</h1>
          <p>&copy; OpenWeather</p>
        </div>
        <div class="current">
          <h2>Heute, {{ data.current.fullDate }}</h2>
          <h1>{{ data.current.weather[0].description }} bei {{ Math.trunc(data.current.main.temp) }}&deg;</h1>
          <h3>
            Max: {{ Math.trunc(data.current.main.temp_max) }}&deg;, Min:
            {{ Math.trunc(data.current.main.temp_min) }}&deg; | Rel. Luftfeuchtigkeit: {{ data.current.main.humidity }}%
          </h3>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="content">
          <div
            v-for="item in Object.keys(data.forecast.formattedList).filter((date) => date !== data.current.date)"
            :key="item"
          >
            <h2>{{ item }}</h2>
            <div
              v-for="times in data.forecast.formattedList[item]"
              :key="times"
            >
              <div class="forecast-item">
                <h3>{{ times.time }}</h3>
                <h3 class="text-right">
                  {{ times.weather[0].description }}<br />
                  bei {{ Math.trunc(times.main.temp) }}&deg;
                </h3>
              </div>
            </div>
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
  background-color: #1a2e05;
  color: #f7fee7;
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
  margin-bottom: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 6rem;
  flex-grow: 0;
  background-color: #365314;
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
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  justify-content: center;
  align-items: start;
  padding: 3rem 6rem;
}
.item {
  display: flex;
  align-items: start;
  font-size: 1.5rem;
}
.forecast-item {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.text-right {
  text-align: right;
}
</style>
