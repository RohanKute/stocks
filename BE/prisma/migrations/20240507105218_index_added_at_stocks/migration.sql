/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Stocks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stocks_ownerId_key" ON "Stocks"("ownerId");
