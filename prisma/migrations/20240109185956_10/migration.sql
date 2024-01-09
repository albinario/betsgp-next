/*
  Warnings:

  - You are about to drop the column `wildCard` on the `gps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gps" DROP COLUMN "wildCard",
ADD COLUMN     "wildCardId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "gps" ADD CONSTRAINT "gps_wildCardId_fkey" FOREIGN KEY ("wildCardId") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
