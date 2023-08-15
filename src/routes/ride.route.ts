import express from "express";
import passport from "passport";
import RideController from "../controllers/RideController";

const rideRoute = express.Router();

rideRoute.post("/", passport.authenticate("jwt", { session: false }), RideController.createRide);
rideRoute.get("/", passport.authenticate("jwt", { session: false }), RideController.getAllRide);

export default rideRoute;
