import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import ApiError from "./utils/ApiError";
import { errorConverter, handleError } from "./middlewares/error";
import morgan from "./config/morgan";
import router from "./routes";
import passport from "passport";
import { jwtStrategy } from "./config/passport";

const app = express();

app.use(cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use(express.json());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use("/v1", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Resource not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(handleError);

export default app;
