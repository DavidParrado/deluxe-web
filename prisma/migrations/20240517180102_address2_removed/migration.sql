/*
  Warnings:

  - You are about to drop the column `address2` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `UserAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "address2";

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "address2";
