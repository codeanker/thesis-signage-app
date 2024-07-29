import type { Device } from '@prisma/client'
import type { FastifyRequest } from 'fastify'
import { z } from 'zod'

import prisma from '../prisma'

export interface ParamsWithDevice {
  device: Device | undefined
}

export interface QueryParams {
  deliveryType: 'CSR' | 'SSR'
  playlistId?: string
}

// preValidation hook for Fastify to authenticate the device
export async function authenticate(req: FastifyRequest<{ Params: ParamsWithDevice; Querystring: QueryParams }>) {
  const deviceId = req.headers.cookie
    ?.trim()
    ?.split(';')
    .find((c) => c.startsWith('deviceId'))
    ?.split('=')[1]

  if (deviceId === undefined) return

  const device = await prisma.device.findUnique({
    where: {
      id: Number(deviceId),
    },
  })

  req.params.device = device ?? undefined
}

// Register a device and return the deviceId and deliveryType
export async function registerDevice(query: QueryParams) {
  const schema = z.strictObject({
    deliveryType: z.enum(['CSR', 'SSR']),
    playlistId: z.string().optional(),
  })

  const data = schema.parse(query)

  const device = await prisma.device.create({
    data: {
      deliveryType: data.deliveryType,
      playlistId: Number(data.playlistId),
    },
    select: {
      id: true,
    },
  })

  return {
    deviceId: device.id,
    deliveryType: data.deliveryType,
  }
}
