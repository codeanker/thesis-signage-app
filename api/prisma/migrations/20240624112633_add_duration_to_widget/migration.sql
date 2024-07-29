/*
  Warnings:

  - Added the required column `duration` to the `Widget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Widget" ADD COLUMN     "duration" INTEGER NOT NULL;
