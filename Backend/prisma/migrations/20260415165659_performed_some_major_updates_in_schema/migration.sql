/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_title_userId_key" ON "Portfolio"("title", "userId");
