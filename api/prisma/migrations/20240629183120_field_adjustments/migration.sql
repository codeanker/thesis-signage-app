/*
  Warnings:

  - You are about to drop the column `lastPlayedWidgetId` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Widget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "lastPlayedWidgetId";

-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "duration";
