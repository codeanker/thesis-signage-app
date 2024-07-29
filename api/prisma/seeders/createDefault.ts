/**
 * Creates default playlist with some initial widgets.
 */

import type { PrismaClient } from '@prisma/client'

import type { Seeder } from './index'

const createDefault: Seeder = async (prisma: PrismaClient) => {
  await prisma.playlist.create({
    data: {
      name: 'My Playlist',
      widgets: {
        create: [
          {
            packageIdentifier: 'website-widget',
            options: {
              url: 'https://codeanker.de/mia-mitarbeitendenportal/',
            },
          },
          {
            packageIdentifier: 'weather-widget',
            options: {
              lat: 54.7945625,
              lon: 9.3908821,
              units: 'metric',
            },
          },
          {
            packageIdentifier: 'news-widget',
            options: {
              url: 'https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml',
            },
          },
        ],
      },
    },
  })
}

export default createDefault
