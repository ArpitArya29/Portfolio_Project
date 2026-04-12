/*
  Warnings:

  - You are about to drop the column `creditedAt` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `creditedAt` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `creditedAt` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `creditedAt` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `creditedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "creditedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "creditedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "creditedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "creditedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "creditedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
