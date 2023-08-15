import express from "express";
import AuthController from "../controllers/AuthController";

const authRoute = express.Router();

authRoute.post("/register", AuthController.registerUser);
authRoute.post("/login", AuthController.login);

export default authRoute;
