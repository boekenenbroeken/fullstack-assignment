-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "championId" INTEGER NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "circuit" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "winnerId" INTEGER NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_name_key" ON "Driver"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Season_year_key" ON "Season"("year");

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
