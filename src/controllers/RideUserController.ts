import { Request, Response } from "express";
import httpStatus from "http-status";
import RideUserService from "../services/RideUserService";
import catchAsync from "../utils/catchAsync";

const subscriptionUserInRide = catchAsync(async (req: Request, res: Response) => {
    const { rideId, userId } = req.body;
    await RideUserService.subscriptionUserInRide(rideId, userId);
    res.status(httpStatus.OK).send("Subscription successfully");
});

const getUserRides = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userRides = await RideUserService.getUserRides(Number(userId));
    res.status(httpStatus.OK).send(userRides);
});

export default {
    subscriptionUserInRide,
    getUserRides
};
