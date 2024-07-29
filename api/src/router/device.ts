import type { FastifyInstance } from 'fastify'

import { authenticate } from '../helper/authentication'
import play from '../helper/play'
import prisma from '../prisma'

export default async function (server: FastifyInstance) {
  // REST-API route for CSR/SPA & SSR/MPA Endpoint
  server.get('/device/play', { preValidation: authenticate }, async (req, rep) => {
    const device = req.params.device

    if (device == undefined) throw new Error('Device not found')

    if (device?.playlistId == undefined) {
      throw new Error('No playlist assigned to device')
    }

    const playlist = await prisma.playlist.findUniqueOrThrow({
      where: {
        id: device.playlistId,
      },
      include: {
        widgets: true,
      },
    })

    const data = await play(device, playlist)
    if (device.deliveryType === 'CSR') rep.type('application/json').send(data)
    else rep.type('text/html').send(data)
  })
}
