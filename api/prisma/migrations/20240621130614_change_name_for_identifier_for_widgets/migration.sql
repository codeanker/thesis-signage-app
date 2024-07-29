/*
  Warnings:

  - You are about to drop the column `nameIdentifier` on the `Widget` table. All the data in the column will be lost.
  - Added the required column `packageIdentifier` to the `Widget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "nameIdentifier",
ADD COLUMN     "packageIdentifier" TEXT NOT NULL;
