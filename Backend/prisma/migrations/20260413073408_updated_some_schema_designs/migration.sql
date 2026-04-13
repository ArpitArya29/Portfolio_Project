/*
  Warnings:

  - A unique constraint covering the columns `[userId,role,company]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Experience_userId_role_key";

-- DropIndex
DROP INDEX "Portfolio_userId_key";

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "github_link" DROP NOT NULL,
ALTER COLUMN "live_link" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Experience_userId_role_company_key" ON "Experience"("userId", "role", "company");
