import express from "express";
import passport from "passport";
import RideUserController from "../controllers/RideUserController";

const ride_userRoute = express.Router();

ride_userRoute.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    RideUserController.subscriptionUserInRide
);

ride_userRoute.get(
    "/:userId",
    passport.authenticate("jwt", { session: false }),
    RideUserController.getUserRides
);

export default ride_userRoute;
