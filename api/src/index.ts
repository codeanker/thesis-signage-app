/**
 * Entry point for the Fastify server.
 */

import { createServer, type ServerConfig } from './fastify'

const nodeEnv = process.env.NODE_ENV ?? 'local'

const serverConfig: ServerConfig = {
  dev: true,
  port: nodeEnv === 'local' ? 3000 : 80,
}

const server = createServer(serverConfig)

server.start()
