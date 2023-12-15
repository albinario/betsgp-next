/*
  Warnings:

  - You are about to drop the column `nation_id` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `gps` table. All the data in the column will be lost.
  - You are about to drop the column `wild_card` on the `gps` table. All the data in the column will be lost.
  - You are about to drop the column `rider_id` on the `picks` table. All the data in the column will be lost.
  - You are about to drop the column `user_picks_id` on the `picks` table. All the data in the column will be lost.
  - You are about to drop the column `nation_id` on the `riders` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `activity_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `riders_results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_picks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_standings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_stars` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nationId` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `gps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riderId` to the `picks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPicksId` to the `picks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationId` to the `riders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activity_log" DROP CONSTRAINT "activity_log_gp_id_fkey";

-- DropForeignKey
ALTER TABLE "activity_log" DROP CONSTRAINT "activity_log_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_nation_id_fkey";

-- DropForeignKey
ALTER TABLE "gps" DROP CONSTRAINT "gps_city_id_fkey";

-- DropForeignKey
ALTER TABLE "picks" DROP CONSTRAINT "picks_rider_id_fkey";

-- DropForeignKey
ALTER TABLE "picks" DROP CONSTRAINT "picks_user_picks_id_fkey";

-- DropForeignKey
ALTER TABLE "riders" DROP CONSTRAINT "riders_nation_id_fkey";

-- DropForeignKey
ALTER TABLE "riders_results" DROP CONSTRAINT "riders_results_gp_id_fkey";

-- DropForeignKey
ALTER TABLE "riders_results" DROP CONSTRAINT "riders_results_rider_id_fkey";

-- DropForeignKey
ALTER TABLE "users_picks" DROP CONSTRAINT "user";

-- DropForeignKey
ALTER TABLE "users_picks" DROP CONSTRAINT "users_picks_gp_id_fkey";

-- DropForeignKey
ALTER TABLE "users_results" DROP CONSTRAINT "users_results_gp_id_fkey";

-- DropForeignKey
ALTER TABLE "users_results" DROP CONSTRAINT "users_results_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_standings" DROP CONSTRAINT "users_standings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_stars" DROP CONSTRAINT "users_stars_user_id_fkey";

-- AlterTable
ALTER TABLE "cities" DROP COLUMN "nation_id",
ADD COLUMN     "nationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "gps" DROP COLUMN "city_id",
DROP COLUMN "wild_card",
ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "wildCard" INTEGER;

-- AlterTable
ALTER TABLE "picks" DROP COLUMN "rider_id",
DROP COLUMN "user_picks_id",
ADD COLUMN     "riderId" INTEGER NOT NULL,
ADD COLUMN     "userPicksId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "riders" DROP COLUMN "nation_id",
ADD COLUMN     "nationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "uuid",
ADD COLUMN     "firstName" VARCHAR(20) NOT NULL DEFAULT '',
ADD COLUMN     "lastName" VARCHAR(20) NOT NULL DEFAULT '',
ADD COLUMN     "uid" UUID NOT NULL;

-- DropTable
DROP TABLE "activity_log";

-- DropTable
DROP TABLE "riders_results";

-- DropTable
DROP TABLE "users_picks";

-- DropTable
DROP TABLE "users_results";

-- DropTable
DROP TABLE "users_standings";

-- DropTable
DROP TABLE "users_stars";

-- CreateTable
CREATE TABLE "activityLog" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "userId" INTEGER,
    "gpId" INTEGER,

    CONSTRAINT "activityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ridersResults" (
    "id" SERIAL NOT NULL,
    "riderId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "podium" INTEGER,

    CONSTRAINT "ridersResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersPicks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usersPicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersResults" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "m1" INTEGER NOT NULL DEFAULT 0,
    "m2" INTEGER NOT NULL DEFAULT 0,
    "m3" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER,

    CONSTRAINT "usersResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersStandings" (
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

    CONSTRAINT "usersStandings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersStars" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "usersStars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activityLog_id_key" ON "activityLog"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ridersResults_id_key" ON "ridersResults"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usersPicks_id_key" ON "usersPicks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usersResults_id_key" ON "usersResults"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usersStandings_id_key" ON "usersStandings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usersStars_id_key" ON "usersStars"("id");

-- AddForeignKey
ALTER TABLE "activityLog" ADD CONSTRAINT "activityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityLog" ADD CONSTRAINT "activityLog_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "nations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps" ADD CONSTRAINT "gps_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riders" ADD CONSTRAINT "riders_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "nations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ridersResults" ADD CONSTRAINT "ridersResults_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ridersResults" ADD CONSTRAINT "ridersResults_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersPicks" ADD CONSTRAINT "user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersPicks" ADD CONSTRAINT "usersPicks_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_userPicksId_fkey" FOREIGN KEY ("userPicksId") REFERENCES "usersPicks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersResults" ADD CONSTRAINT "usersResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersResults" ADD CONSTRAINT "usersResults_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersStandings" ADD CONSTRAINT "usersStandings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersStars" ADD CONSTRAINT "usersStars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
