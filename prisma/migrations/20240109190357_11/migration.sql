-- DropForeignKey
ALTER TABLE "gps" DROP CONSTRAINT "gps_wildCardId_fkey";

-- AlterTable
ALTER TABLE "gps" ALTER COLUMN "wildCardId" DROP NOT NULL,
ALTER COLUMN "wildCardId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "gps" ADD CONSTRAINT "gps_wildCardId_fkey" FOREIGN KEY ("wildCardId") REFERENCES "riders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
