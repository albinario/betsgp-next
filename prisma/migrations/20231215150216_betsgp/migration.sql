/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "activity_log" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "user_id" INTEGER,
    "gp_id" INTEGER,

    CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nation_id" INTEGER NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gps" (
    "id" SERIAL NOT NULL,
    "gp" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "startDate" DATE,
    "wild_card" INTEGER,
    "finished" BOOLEAN,

    CONSTRAINT "gps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL DEFAULT '',
    "code" CHAR(2) NOT NULL DEFAULT '',

    CONSTRAINT "nations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "nation_id" INTEGER NOT NULL,
    "active" BOOLEAN,
    "substitute" BOOLEAN,

    CONSTRAINT "riders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riders_results" (
    "id" SERIAL NOT NULL,
    "rider_id" INTEGER NOT NULL,
    "gp_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "podium" INTEGER,

    CONSTRAINT "riders_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "first_name" VARCHAR(20) NOT NULL DEFAULT '',
    "last_name" VARCHAR(20) NOT NULL DEFAULT '',
    "email" VARCHAR(100) NOT NULL DEFAULT '',
    "admin" BOOLEAN,
    "reminder" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_picks" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "gp_id" INTEGER NOT NULL,
    "date_created" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_picks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picks" (
    "id" SERIAL NOT NULL,
    "user_picks_id" INTEGER NOT NULL,
    "rider_id" INTEGER NOT NULL,

    CONSTRAINT "picks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_results" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "gp_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "p_1" INTEGER NOT NULL DEFAULT 0,
    "p_2" INTEGER NOT NULL DEFAULT 0,
    "p_3" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER,

    CONSTRAINT "users_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_standings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "p_1" INTEGER NOT NULL DEFAULT 0,
    "p_2" INTEGER NOT NULL DEFAULT 0,
    "p_3" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER,
    "prev_position" INTEGER,

    CONSTRAINT "users_standings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_stars" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "users_stars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activity_log_id_key" ON "activity_log"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cities_id_key" ON "cities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "gps_id_key" ON "gps"("id");

-- CreateIndex
CREATE UNIQUE INDEX "nations_id_key" ON "nations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "riders_id_key" ON "riders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "riders_results_id_key" ON "riders_results"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_picks_id_key" ON "users_picks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "picks_id_key" ON "picks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_results_id_key" ON "users_results"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_standings_id_key" ON "users_standings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stars_id_key" ON "users_stars"("id");

-- AddForeignKey
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_gp_id_fkey" FOREIGN KEY ("gp_id") REFERENCES "gps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_nation_id_fkey" FOREIGN KEY ("nation_id") REFERENCES "nations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps" ADD CONSTRAINT "gps_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riders" ADD CONSTRAINT "riders_nation_id_fkey" FOREIGN KEY ("nation_id") REFERENCES "nations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riders_results" ADD CONSTRAINT "riders_results_rider_id_fkey" FOREIGN KEY ("rider_id") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riders_results" ADD CONSTRAINT "riders_results_gp_id_fkey" FOREIGN KEY ("gp_id") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_picks" ADD CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_picks" ADD CONSTRAINT "users_picks_gp_id_fkey" FOREIGN KEY ("gp_id") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_user_picks_id_fkey" FOREIGN KEY ("user_picks_id") REFERENCES "users_picks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_rider_id_fkey" FOREIGN KEY ("rider_id") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_results" ADD CONSTRAINT "users_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_results" ADD CONSTRAINT "users_results_gp_id_fkey" FOREIGN KEY ("gp_id") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_standings" ADD CONSTRAINT "users_standings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_stars" ADD CONSTRAINT "users_stars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
