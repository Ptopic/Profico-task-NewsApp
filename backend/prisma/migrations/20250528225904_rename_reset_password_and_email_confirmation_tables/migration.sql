/*
  Warnings:

  - You are about to drop the `EmailConfirmationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResetPasswordToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailConfirmationToken" DROP CONSTRAINT "EmailConfirmationToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResetPasswordToken" DROP CONSTRAINT "ResetPasswordToken_userId_fkey";

-- DropTable
DROP TABLE "EmailConfirmationToken";

-- DropTable
DROP TABLE "ResetPasswordToken";

-- CreateTable
CREATE TABLE "ResetPassword" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailConfirmation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EmailConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassword_token_key" ON "ResetPassword"("token");

-- CreateIndex
CREATE INDEX "ResetPassword_token_idx" ON "ResetPassword"("token");

-- CreateIndex
CREATE INDEX "ResetPassword_expiresAt_idx" ON "ResetPassword"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfirmation_token_key" ON "EmailConfirmation"("token");

-- CreateIndex
CREATE INDEX "EmailConfirmation_token_idx" ON "EmailConfirmation"("token");

-- CreateIndex
CREATE INDEX "EmailConfirmation_expiresAt_idx" ON "EmailConfirmation"("expiresAt");

-- AddForeignKey
ALTER TABLE "ResetPassword" ADD CONSTRAINT "ResetPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailConfirmation" ADD CONSTRAINT "EmailConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
