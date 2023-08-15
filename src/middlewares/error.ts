import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message);
    }
    next(err);
};

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
    const { statusCode, message } = err;
    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message
    };

    res.status(statusCode).send(response);
};
