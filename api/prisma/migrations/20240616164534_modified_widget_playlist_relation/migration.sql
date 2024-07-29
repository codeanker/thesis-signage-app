/*
  Warnings:

  - You are about to drop the column `playlistId` on the `Widget` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Widget" DROP CONSTRAINT "Widget_playlistId_fkey";

-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "playlistId";

-- CreateTable
CREATE TABLE "_PlaylistToWidget" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToWidget_AB_unique" ON "_PlaylistToWidget"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToWidget_B_index" ON "_PlaylistToWidget"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistToWidget" ADD CONSTRAINT "_PlaylistToWidget_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToWidget" ADD CONSTRAINT "_PlaylistToWidget_B_fkey" FOREIGN KEY ("B") REFERENCES "Widget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
