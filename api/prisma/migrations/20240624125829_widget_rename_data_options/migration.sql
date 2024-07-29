/*
  Warnings:

  - You are about to drop the column `data` on the `Widget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "data",
ADD COLUMN     "options" JSONB;
