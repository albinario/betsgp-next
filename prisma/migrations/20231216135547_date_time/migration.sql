/*
  Warnings:

  - You are about to drop the column `startDate` on the `gps` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `gps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gps" DROP COLUMN "startDate",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;
