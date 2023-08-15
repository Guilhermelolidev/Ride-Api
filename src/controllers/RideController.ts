import { Request, Response } from "express";
import httpStatus from "http-status";
import RideService from "../services/RideService";
import catchAsync from "../utils/catchAsync";
import Pick from "../utils/pick";

const createRide = catchAsync(async (req: Request, res: Response) => {
    await RideService.createRide(req.body);
    res.status(httpStatus.CREATED).send("Ride created");
});

const getAllRide = catchAsync(async (req: Request, res: Response) => {
    const options = Pick(req.query, ["sortBy", "limit", "page", "sortType"]);
    const filters = Pick(req.query, ["name"]);
    const rides = await RideService.queryRide(filters, options);
    res.status(httpStatus.OK).send(rides);
});

export default {
    createRide,
    getAllRide
};
