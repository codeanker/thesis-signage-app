<script setup lang="ts">
import { ref, shallowRef, type Component } from 'vue'

import { API_URL } from '@/main'

const widgetComponent = shallowRef<Component | undefined>()
const widgetData = ref<Record<string, unknown> | undefined>()
const timer = ref<ReturnType<typeof setTimeout> | undefined>()

// Fetch widget data from api and import widget component from packages
const fetchData = async () => {
  try {
    if (timer.value) {
      clearTimeout(timer.value)
    }
    const response = await fetch(API_URL + '/device/play', {
      method: 'GET',
      credentials: 'include',
    })
    const { widgetToRender, data, duration } = await response.json()
    const widgetComponentImport = await import(`@/../../packages/${widgetToRender.packageIdentifier}/src/Component.vue`)
    widgetComponent.value = widgetComponentImport.default
    widgetData.value = data
    timer.value = setTimeout(async () => {
      await fetchData()
    }, duration)
  } catch (error) {
    console.error(error)
  }
}

fetchData()
</script>

<template>
  <div class="center-wrapper">
    <component
      :is="widgetComponent"
      v-if="widgetComponent"
      :key="widgetComponent.name"
      :data="widgetData"
    />
  </div>
</template>
