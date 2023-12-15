/*
  Warnings:

  - Made the column `admin` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "admin" SET NOT NULL,
ALTER COLUMN "admin" SET DEFAULT false;
