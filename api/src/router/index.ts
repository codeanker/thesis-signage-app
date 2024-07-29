/**
 * Main router file for REST-API routes and SSR/MPA routes.
 */

import type { FastifyInstance } from 'fastify'

import { authenticate, registerDevice } from '../helper/authentication'

import deviceRoutes from './device'
import playlistRoutes from './playlist'
import widgetRoutes from './widget'

export default async function (server: FastifyInstance) {
  server.get('/', { preValidation: authenticate }, async (req, rep) => {
    // Handle device registration and redirection
    if (req.params.device == undefined) {
      const { deviceId, deliveryType } = await registerDevice(req.query)
      if (deliveryType === 'CSR') {
        rep
          .headers({ 'set-cookie': `deviceId=${deviceId}; path=/` })
          .code(200)
          .send('ok')
      } else {
        rep
          .headers({ 'set-cookie': `deviceId=${deviceId}; path=/` })
          .status(308)
          .redirect(process.env.CLIENT_URL != undefined ? '/server/device/play' : '/device/play')
      }
    } else {
      if (req.params.device.deliveryType !== 'SSR') rep.status(200).send('ok')
      rep.status(308).redirect('/device/play')
    }
  })

  server.register(deviceRoutes)

  // REST-API routes
  server.register(playlistRoutes)
  server.register(widgetRoutes)
}
