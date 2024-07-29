import fs from 'fs'

import axios from 'axios'
import QRCode from 'qrcode'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import xml2js from 'xml2js'

import { dirname, extractHtmlTemplate, ssrReloadHandler, ssrTemplateWrapper } from '@thesis-signage-app/helpers'

export interface NewsWidgetOptions {
  url: string
}

export interface NewsWidgetData {
  title: string
  link: string
  copyright: string
  pubDate: string
  item: any[]
  qrcode: string
}

export class Widget {
  options: NewsWidgetOptions
  data: NewsWidgetData | undefined
  duration: number

  constructor(options: NewsWidgetOptions) {
    this.options = options
    this.data = undefined
    this.duration = 40000
  }

  async init() {
    // Fetch RSS feed
    const rssString = await axios.get(this.options.url, {
      responseType: 'text',
      responseEncoding: 'utf8',
    })
    const parsedXml = await xml2js.parseStringPromise(rssString.data)
    this.data = parsedXml.rss.channel[0]
    if (this.data == undefined) throw new Error('No data found in RSS feed')
    this.data.qrcode = await QRCode.toDataURL(this.data.link)
    if (this.data?.item.length > 12) {
      this.data.item = this.data.item.slice(0, 12)
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
