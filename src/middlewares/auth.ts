import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import passport from "passport";
import ApiError from "../utils/ApiError";

const verifyCallback =
    (req: any, resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) =>
    async (err: unknown, user: User | false, info: unknown) => {
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
        }
        req.user = user;

        return resolve();
    };

const auth = (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
        passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject));
    })
        .then(() => next())
        .catch((err) => next(err));
};

export default auth;
