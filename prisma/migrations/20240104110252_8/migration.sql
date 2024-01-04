/*
  Warnings:

  - You are about to drop the column `action` on the `activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activity" DROP COLUMN "action",
ADD COLUMN     "creation" BOOLEAN NOT NULL DEFAULT true;
