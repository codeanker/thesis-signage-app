/*
  Warnings:

  - You are about to drop the `_PlaylistToWidget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlaylistToWidget" DROP CONSTRAINT "_PlaylistToWidget_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToWidget" DROP CONSTRAINT "_PlaylistToWidget_B_fkey";

-- AlterTable
ALTER TABLE "Widget" ADD COLUMN     "playlistId" INTEGER;

-- DropTable
DROP TABLE "_PlaylistToWidget";

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
