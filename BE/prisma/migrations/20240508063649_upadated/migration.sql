-- AlterTable
ALTER TABLE "Stocks" ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "quantity" DROP DEFAULT,
ALTER COLUMN "totalPurchase" DROP NOT NULL,
ALTER COLUMN "totalPurchase" DROP DEFAULT;
