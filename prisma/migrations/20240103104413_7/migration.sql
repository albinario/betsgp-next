/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `userPicks` table. All the data in the column will be lost.
  - You are about to drop the column `dateUpdated` on the `userPicks` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `userResults` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `userStandings` table. All the data in the column will be lost.
  - You are about to drop the column `prevPosition` on the `userStandings` table. All the data in the column will be lost.
  - Made the column `m1` on table `riderResults` required. This step will fail if there are existing NULL values in that column.
  - Made the column `m2` on table `riderResults` required. This step will fail if there are existing NULL values in that column.
  - Made the column `m3` on table `riderResults` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated` to the `userPicks` table without a default value. This is not possible if the table is not empty.
  - Made the column `m1` on table `userResults` required. This step will fail if there are existing NULL values in that column.
  - Made the column `m2` on table `userResults` required. This step will fail if there are existing NULL values in that column.
  - Made the column `m3` on table `userResults` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "activity_id_key";

-- DropIndex
DROP INDEX "gps_id_key";

-- DropIndex
DROP INDEX "nations_id_key";

-- DropIndex
DROP INDEX "picks_id_key";

-- DropIndex
DROP INDEX "riderResults_id_key";

-- DropIndex
DROP INDEX "riders_id_key";

-- DropIndex
DROP INDEX "userPicks_id_key";

-- DropIndex
DROP INDEX "userResults_id_key";

-- DropIndex
DROP INDEX "userStandings_id_key";

-- DropIndex
DROP INDEX "userStars_id_key";

-- DropIndex
DROP INDEX "users_id_key";

-- AlterTable
ALTER TABLE "riderResults" ALTER COLUMN "m1" SET NOT NULL,
ALTER COLUMN "m1" SET DEFAULT 0,
ALTER COLUMN "m2" SET NOT NULL,
ALTER COLUMN "m2" SET DEFAULT 0,
ALTER COLUMN "m3" SET NOT NULL,
ALTER COLUMN "m3" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "userPicks" DROP COLUMN "dateCreated",
DROP COLUMN "dateUpdated",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "userResults" DROP COLUMN "position",
ADD COLUMN     "pos" INTEGER,
ALTER COLUMN "m1" SET NOT NULL,
ALTER COLUMN "m1" SET DEFAULT 0,
ALTER COLUMN "m2" SET NOT NULL,
ALTER COLUMN "m2" SET DEFAULT 0,
ALTER COLUMN "m3" SET NOT NULL,
ALTER COLUMN "m3" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "userStandings" DROP COLUMN "position",
DROP COLUMN "prevPosition",
ADD COLUMN     "pos" INTEGER,
ADD COLUMN     "prevPos" INTEGER;
