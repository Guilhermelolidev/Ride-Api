import { Request, Response } from "express";
import httpStatus from "http-status";
import UserService from "../services/UserService";
import catchAsync from "../utils/catchAsync";

const updatePassword = catchAsync(async (req: Request, res: Response) => {
    const { password, userId } = req.body;
    await UserService.updatePassword(userId, password);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    updatePassword
};
