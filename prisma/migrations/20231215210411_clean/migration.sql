/*
  Warnings:

  - You are about to drop the column `userPicksId` on the `picks` table. All the data in the column will be lost.
  - You are about to drop the `ridersResults` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersPicks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersResults` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersStandings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersStars` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userPickId` to the `picks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "picks" DROP CONSTRAINT "picks_userPicksId_fkey";

-- DropForeignKey
ALTER TABLE "ridersResults" DROP CONSTRAINT "ridersResults_gpId_fkey";

-- DropForeignKey
ALTER TABLE "ridersResults" DROP CONSTRAINT "ridersResults_riderId_fkey";

-- DropForeignKey
ALTER TABLE "usersPicks" DROP CONSTRAINT "user";

-- DropForeignKey
ALTER TABLE "usersPicks" DROP CONSTRAINT "usersPicks_gpId_fkey";

-- DropForeignKey
ALTER TABLE "usersResults" DROP CONSTRAINT "usersResults_gpId_fkey";

-- DropForeignKey
ALTER TABLE "usersResults" DROP CONSTRAINT "usersResults_userId_fkey";

-- DropForeignKey
ALTER TABLE "usersStandings" DROP CONSTRAINT "usersStandings_userId_fkey";

-- DropForeignKey
ALTER TABLE "usersStars" DROP CONSTRAINT "usersStars_userId_fkey";

-- AlterTable
ALTER TABLE "picks" DROP COLUMN "userPicksId",
ADD COLUMN     "userPickId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ridersResults";

-- DropTable
DROP TABLE "usersPicks";

-- DropTable
DROP TABLE "usersResults";

-- DropTable
DROP TABLE "usersStandings";

-- DropTable
DROP TABLE "usersStars";

-- CreateTable
CREATE TABLE "riderResults" (
    "id" SERIAL NOT NULL,
    "riderId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "podium" INTEGER,

    CONSTRAINT "riderResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPicks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userResults" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "m1" INTEGER NOT NULL DEFAULT 0,
    "m2" INTEGER NOT NULL DEFAULT 0,
    "m3" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER,

    CONSTRAINT "userResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userStandings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "m1" INTEGER NOT NULL DEFAULT 0,
    "m2" INTEGER NOT NULL DEFAULT 0,
    "m3" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER,
    "prevPosition" INTEGER,

    CONSTRAINT "userStandings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userStars" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "userStars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "riderResults_id_key" ON "riderResults"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userPicks_id_key" ON "userPicks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userResults_id_key" ON "userResults"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userStandings_id_key" ON "userStandings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userStars_id_key" ON "userStars"("id");

-- AddForeignKey
ALTER TABLE "riderResults" ADD CONSTRAINT "riderResults_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riderResults" ADD CONSTRAINT "riderResults_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPicks" ADD CONSTRAINT "user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPicks" ADD CONSTRAINT "userPicks_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_userPickId_fkey" FOREIGN KEY ("userPickId") REFERENCES "userPicks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userResults" ADD CONSTRAINT "userResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userResults" ADD CONSTRAINT "userResults_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userStandings" ADD CONSTRAINT "userStandings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userStars" ADD CONSTRAINT "userStars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
