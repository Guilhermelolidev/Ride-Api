import express from "express";
import authRoute from "./auth.route";
import rideRoute from "./ride.route";
import ride_userRoute from "./ride_user.route";
import userRoute from "./user.route";

type Routes = {
    path: string;
    route: any;
};

const router = express.Router();

const routes: Routes[] = [
    {
        path: "/user",
        route: userRoute
    },
    {
        path: "/auth",
        route: authRoute
    },
    {
        path: "/ride",
        route: rideRoute
    },
    {
        path: "/rideUser",
        route: ride_userRoute
    }
];

routes.forEach((route: Routes) => {
    router.use(route.path, route.route);
});

export default router;
