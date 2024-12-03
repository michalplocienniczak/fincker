-- CreateTable
CREATE TABLE "StripeSubscription" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "stripeCustomerId" TEXT NOT NULL,
    "isPlanActive" BOOLEAN NOT NULL DEFAULT false,
    "planExpiresAt" BIGINT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StripeSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StripeSubscription_stripeCustomerId_key" ON "StripeSubscription"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeSubscription_userId_key" ON "StripeSubscription"("userId");

-- AddForeignKey
ALTER TABLE "StripeSubscription" ADD CONSTRAINT "StripeSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
