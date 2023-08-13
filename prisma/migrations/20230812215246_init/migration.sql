-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "start_date_registration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date_registration" TIMESTAMP(3) NOT NULL,
    "additional_information" TEXT,
    "start_place" TEXT NOT NULL,
    "participants_limit" INTEGER,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);
