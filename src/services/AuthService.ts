import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { encryptPassword, isPasswordMatch } from "../utils/encryption";
import exclude from "../utils/exclude";
import UserService from "./UserService";

const prisma = new PrismaClient();

const registerUser = async (email: string, name: string, password: string) => {
    const user = await UserService.findUserByEmail(email);

    if (user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "email already taken");
    }

    const userCreated = await prisma.user.create({
        data: { email, name, password: await encryptPassword(password) }
    });

    return exclude(userCreated, ["password"]);
};

const loginUserWithEmailAndPassword = async (email: string, password: string) => {
    const user = await UserService.findUserByEmail(email);

    if (!user || !(await isPasswordMatch(password, user.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorret email or password");
    }

    return exclude(user, ["password"]);
};

export default {
    registerUser,
    loginUserWithEmailAndPassword
};
