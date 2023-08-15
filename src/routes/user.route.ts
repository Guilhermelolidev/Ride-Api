import express from "express";
import passport from "passport";
import UserController from "../controllers/UserController";

const userRoute = express.Router();

userRoute.put(
    "/updatePassword",
    passport.authenticate("jwt", { session: false }),
    UserController.updatePassword
);

export default userRoute;
