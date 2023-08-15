import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import RideService from "./RideService";

const prisma = new PrismaClient();

const subscriptionUserInRide = async (rideId: number, userId: number) => {
    const ride = await RideService.getRideById(rideId);

    if (!ride) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ride not found");
    }

    const userRide = await prisma.ride_User.findFirst({
        where: { rideId, userId }
    });

    if (userRide) {
        throw new ApiError(httpStatus.BAD_REQUEST, "You are already subscribed");
    }

    if (new Date() > ride.end_date_registration) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Ride registration time has expired");
    }

    return await prisma.ride_User.create({
        data: { rideId, userId }
    });
};

const getUserRides = (userId: number) => {
    const userRides = prisma.ride_User.findMany({
        where: { userId },
        include: {
            ride: true
        }
    });

    return userRides;
};

export default {
    subscriptionUserInRide,
    getUserRides
};
