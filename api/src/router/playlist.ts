import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import prisma from '../prisma'

export default async function (server: FastifyInstance) {
  server.post('/playlist', async (req) => {
    const schema = z.strictObject({
      name: z.string(),
      widgets: z.array(
        z.object({
          packageIdentifier: z.string(),
          options: z.record(z.string(), z.string()).optional(),
        })
      ),
    })

    const data = schema.parse(req.body)

    const playlist = await prisma.playlist.create({
      data: {
        name: data.name,
        widgets: {
          create: data.widgets,
        },
      },
      select: {
        id: true,
      },
    })

    return playlist
  })
}
