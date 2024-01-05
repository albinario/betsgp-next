/*
  Warnings:

  - You are about to drop the `picks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pick1Id` to the `userPicks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pick2Id` to the `userPicks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pick3Id` to the `userPicks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "picks" DROP CONSTRAINT "picks_riderId_fkey";

-- DropForeignKey
ALTER TABLE "picks" DROP CONSTRAINT "picks_userPickId_fkey";

-- AlterTable
ALTER TABLE "userPicks" ADD COLUMN     "pick1Id" INTEGER NOT NULL,
ADD COLUMN     "pick2Id" INTEGER NOT NULL,
ADD COLUMN     "pick3Id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "picks";

-- AddForeignKey
ALTER TABLE "userPicks" ADD CONSTRAINT "userPicks_pick1Id_fkey" FOREIGN KEY ("pick1Id") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPicks" ADD CONSTRAINT "userPicks_pick2Id_fkey" FOREIGN KEY ("pick2Id") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPicks" ADD CONSTRAINT "userPicks_pick3Id_fkey" FOREIGN KEY ("pick3Id") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
