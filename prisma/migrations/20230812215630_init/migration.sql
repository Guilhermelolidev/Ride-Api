-- CreateTable
CREATE TABLE "Ride_User" (
    "rideId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscription_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ride_User_pkey" PRIMARY KEY ("rideId","userId")
);

-- AddForeignKey
ALTER TABLE "Ride_User" ADD CONSTRAINT "Ride_User_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride_User" ADD CONSTRAINT "Ride_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
