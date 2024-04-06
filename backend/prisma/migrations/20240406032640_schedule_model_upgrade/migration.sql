/*
  Warnings:

  - You are about to drop the column `endTDateTime` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `endDateTime` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "endTDateTime",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL;
