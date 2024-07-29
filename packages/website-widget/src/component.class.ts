import fs from 'fs'

import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

import { dirname, extractHtmlTemplate, ssrReloadHandler, ssrTemplateWrapper } from '@thesis-signage-app/helpers'

export interface MediaWidgetOptions {
  url: string
}

export class Widget {
  options: MediaWidgetOptions
  data: any
  duration: number

  constructor(options: MediaWidgetOptions) {
    this.options = options
    this.data = undefined
    this.duration = 15000
  }

  async init() {
    this.data = {
      url: this.options.url,
    }
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
