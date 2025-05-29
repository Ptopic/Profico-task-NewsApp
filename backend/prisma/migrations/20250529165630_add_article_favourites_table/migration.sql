-- DropIndex
DROP INDEX "EmailConfirmationRequest_expiresAt_idx";

-- DropIndex
DROP INDEX "EmailConfirmationRequest_token_idx";

-- DropIndex
DROP INDEX "ResetPasswordRequest_expiresAt_idx";

-- DropIndex
DROP INDEX "ResetPasswordRequest_token_idx";

-- CreateTable
CREATE TABLE "FavouriteArticle" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleId" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "urlToImage" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FavouriteArticle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavouriteArticle" ADD CONSTRAINT "FavouriteArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
