import fs from 'fs'

import axios from 'axios'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

import {
  dirname,
  extractHtmlTemplate,
  formatDate,
  ssrReloadHandler,
  ssrTemplateWrapper,
} from '@thesis-signage-app/helpers'

export interface WeatherWidgetOptions {
  lat: number
  lon: number
  units: string
}

export class Widget {
  options: WeatherWidgetOptions
  data: any
  duration: number

  constructor(options: WeatherWidgetOptions) {
    this.options = options
    this.data = undefined
    this.duration = 15000
  }

  async init() {
    const appId = process.env.OPENWEATHERMAP_API_KEY
    if (appId == undefined) throw new Error('OpenWeatherMap API key not found')

    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.options.lat}&lon=${this.options.lon}&appid=${appId}&units=metric&lang=de`
    )
    const weatherForecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${this.options.lat}&lon=${this.options.lon}&appid=${appId}&units=metric&lang=de`
    )

    this.data = {
      current: currentWeatherResponse.data,
      forecast: weatherForecastResponse.data,
    }

    // Format dates
    this.data.current.fullDate = formatDate(this.data.current.dt)
    this.data.current.date = formatDate(this.data.current.dt, 'dateOnly')
    for (const forecast of this.data.forecast.list) {
      forecast.date = formatDate(forecast.dt, 'dateOnly')
      forecast.time = formatDate(forecast.dt, 'timeOnly')
    }

    // Transform forecast list to better fit the template
    const formattedList: any = {}
    for (const forecast of this.data.forecast.list) {
      if (!formattedList[forecast.date]) {
        formattedList[forecast.date] = []
      }
      formattedList[forecast.date].push(forecast)
    }
    this.data.forecast.formattedList = formattedList
  }

  async render() {
    const template = extractHtmlTemplate(
      fs.readFileSync(dirname(import.meta.url) + '/Component.vue', 'utf-8').replace(/\n/g, '')
    )

    if (template != null) {
      const app = createSSRApp({
        template: template,
        data: () => ({
          data: this.data,
        }),
      })
      const html = await renderToString(app)

      return ssrTemplateWrapper(html + ssrReloadHandler(this.duration))
    }
  }
}
