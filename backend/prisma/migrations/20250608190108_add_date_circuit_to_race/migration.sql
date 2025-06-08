/*
  Warnings:

  - Added the required column `circuit` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Race` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Race"
ADD COLUMN "date" TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN "circuit" TEXT NOT NULL DEFAULT 'UNKNOWN';
