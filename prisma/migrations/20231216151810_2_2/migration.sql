-- CreateTable
CREATE TABLE "activity" (
    "id" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nationId" INTEGER NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gps" (
    "id" SERIAL NOT NULL,
    "gp" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "wildCard" INTEGER,
    "finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "gps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "nations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "nationId" INTEGER NOT NULL,
    "active" INTEGER NOT NULL DEFAULT 0,
    "sub" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "riders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riderResults" (
    "id" SERIAL NOT NULL,
    "riderId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "races" INTEGER NOT NULL DEFAULT 0,
    "medal" INTEGER,

    CONSTRAINT "riderResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "reminder" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPicks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gpId" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picks" (
    "id" SERIAL NOT NULL,
    "userPickId" INTEGER NOT NULL,
    "riderId" INTEGER NOT NULL,

    CONSTRAINT "picks_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "activity_id_key" ON "activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cities_id_key" ON "cities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "gps_id_key" ON "gps"("id");

-- CreateIndex
CREATE UNIQUE INDEX "nations_id_key" ON "nations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "riders_id_key" ON "riders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "riderResults_id_key" ON "riderResults"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userPicks_id_key" ON "userPicks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "picks_id_key" ON "picks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userResults_id_key" ON "userResults"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userStandings_id_key" ON "userStandings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userStars_id_key" ON "userStars"("id");

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "nations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps" ADD CONSTRAINT "gps_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riders" ADD CONSTRAINT "riders_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "nations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riderResults" ADD CONSTRAINT "riderResults_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riderResults" ADD CONSTRAINT "riderResults_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPicks" ADD CONSTRAINT "userPicks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPicks" ADD CONSTRAINT "userPicks_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_userPickId_fkey" FOREIGN KEY ("userPickId") REFERENCES "userPicks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userResults" ADD CONSTRAINT "userResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userResults" ADD CONSTRAINT "userResults_gpId_fkey" FOREIGN KEY ("gpId") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userStandings" ADD CONSTRAINT "userStandings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userStars" ADD CONSTRAINT "userStars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
