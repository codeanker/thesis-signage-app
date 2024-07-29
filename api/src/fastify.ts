/**
 * Fastify web framework configuration.
 */

import fastifyCors from '@fastify/cors'
import fastify from 'fastify'

import routes from './router'

const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173'

export interface ServerConfig {
  dev?: boolean
  port: number
  prefix?: string
  maxParamLength?: number
}

export function createServer(config: ServerConfig) {
  const server = fastify({
    maxParamLength: config.maxParamLength ?? 5000,
  })

  if (config.dev) {
    server.register(fastifyCors, {
      credentials: true,
      origin: clientUrl,
    })
  }

  // Register routes from router directory
  server.register(routes)

  const start = async () => {
    try {
      await server.listen({ port: config.port, host: '0.0.0.0' })
      // eslint-disable-next-line no-console
      console.info('Server listening on port ' + config.port)
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }

  return {
    start,
  }
}
