/*
  Warnings:

  - You are about to drop the column `averageReview` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "averageReview",
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
