/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_portfolioId_fkey";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "portfolioId";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "portfolioId";

-- CreateTable
CREATE TABLE "_PortfolioToProject" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PortfolioToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ExperienceToPortfolio" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExperienceToPortfolio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PortfolioToProject_B_index" ON "_PortfolioToProject"("B");

-- CreateIndex
CREATE INDEX "_ExperienceToPortfolio_B_index" ON "_ExperienceToPortfolio"("B");

-- AddForeignKey
ALTER TABLE "_PortfolioToProject" ADD CONSTRAINT "_PortfolioToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToProject" ADD CONSTRAINT "_PortfolioToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToPortfolio" ADD CONSTRAINT "_ExperienceToPortfolio_A_fkey" FOREIGN KEY ("A") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToPortfolio" ADD CONSTRAINT "_ExperienceToPortfolio_B_fkey" FOREIGN KEY ("B") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
