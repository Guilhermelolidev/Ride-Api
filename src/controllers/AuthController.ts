import { Request, Response } from "express";
import httpStatus from "http-status";
import AuthService from "../services/AuthService";
import TokenService from "../services/TokenService";
import catchAsync from "../utils/catchAsync";

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    const user = await AuthService.registerUser(email, name, password);
    res.status(httpStatus.CREATED).json(user);
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await AuthService.loginUserWithEmailAndPassword(email, password);
    const tokens = await TokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

export default {
    login,
    registerUser
};
