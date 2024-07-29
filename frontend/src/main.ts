import { createApp } from 'vue'

import '@/style.css'
import App from '@/App.vue'
import router from '@/router'

export const API_URL = import.meta.env.DEV ? 'http://localhost:3000' : '/server'

// Register new device on application start
async function fetchData() {
  try {
    await fetch(API_URL + '?deliveryType=CSR&playlistId=1', {
      method: 'GET',
      credentials: 'include',
    })
  } catch (error) {
    console.error(error)
  }
}

fetchData()

createApp(App).use(router).mount('#app')
