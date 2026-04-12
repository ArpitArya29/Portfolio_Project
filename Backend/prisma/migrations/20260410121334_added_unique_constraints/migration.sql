/*
  Warnings:

  - A unique constraint covering the columns `[userId,role]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Experience_userId_role_key" ON "Experience"("userId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Project_userId_title_key" ON "Project"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_userId_name_key" ON "Skill"("userId", "name");
