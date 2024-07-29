/**
 * Prisma Seeder
 * Connect to the database and run provided seeders.
 */

import { PrismaClient } from '@prisma/client'

import createDefault from './createDefault'

export type Seeder = (prisma: PrismaClient) => Promise<void>

const seeders: Seeder[] = [createDefault]

const prisma = new PrismaClient()

try {
  await prisma.$connect()
  for (const seeder of seeders) {
    await seeder(prisma)
  }
} catch (error) {
  console.error(error)
  process.exit(1)
} finally {
  await prisma.$disconnect()
}
