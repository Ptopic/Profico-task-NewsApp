/*
  Warnings:

  - You are about to drop the `EmailConfirmation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResetPassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailConfirmation" DROP CONSTRAINT "EmailConfirmation_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResetPassword" DROP CONSTRAINT "ResetPassword_userId_fkey";

-- DropTable
DROP TABLE "EmailConfirmation";

-- DropTable
DROP TABLE "ResetPassword";

-- CreateTable
CREATE TABLE "ResetPasswordRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ResetPasswordRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailConfirmationRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EmailConfirmationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordRequest_token_key" ON "ResetPasswordRequest"("token");

-- CreateIndex
CREATE INDEX "ResetPasswordRequest_token_idx" ON "ResetPasswordRequest"("token");

-- CreateIndex
CREATE INDEX "ResetPasswordRequest_expiresAt_idx" ON "ResetPasswordRequest"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfirmationRequest_token_key" ON "EmailConfirmationRequest"("token");

-- CreateIndex
CREATE INDEX "EmailConfirmationRequest_token_idx" ON "EmailConfirmationRequest"("token");

-- CreateIndex
CREATE INDEX "EmailConfirmationRequest_expiresAt_idx" ON "EmailConfirmationRequest"("expiresAt");

-- AddForeignKey
ALTER TABLE "ResetPasswordRequest" ADD CONSTRAINT "ResetPasswordRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailConfirmationRequest" ADD CONSTRAINT "EmailConfirmationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
