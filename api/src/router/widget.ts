import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import prisma from '../prisma'

export default async function (server: FastifyInstance) {
  server.post('/widget', async (req) => {
    const schema = z.strictObject({
      packageIdentifier: z.string(),
      options: z.record(z.string(), z.any()).optional(),
    })

    const data = schema.parse(req.body)

    const widget = await prisma.widget.create({
      data,
      select: {
        id: true,
      },
    })

    return widget
  })
}
