import type { Device, Playlist, Widget } from '@prisma/client'

let widgetIndexToRender: number = 0

interface PlaylistWithWidgets extends Playlist {
  widgets?: Widget[]
}

// play widgets based on the device delivery type and return the rendered widget or data
export default async function (device: Device, playlist: PlaylistWithWidgets) {
  if (!playlist.widgets) throw new Error('No widgets found in playlist')

  const widgetToRender = playlist.widgets[widgetIndexToRender]
  const widgetToRenderImport = await import(`@thesis-signage-app/${widgetToRender.packageIdentifier}`)
  const widgetInstance = new widgetToRenderImport.Widget(widgetToRender.options)

  await widgetInstance.init()

  widgetIndexToRender++
  if (widgetIndexToRender >= playlist.widgets.length) widgetIndexToRender = 0

  if (device.deliveryType === 'SSR') {
    return widgetInstance.render()
  } else {
    return {
      widgetToRender,
      data: widgetInstance.data,
      duration: widgetInstance.duration,
    }
  }
}
