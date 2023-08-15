import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../utils/encryption";

const prisma = new PrismaClient();

const updatePassword = async (userId: number, password: string) => {
    return await prisma.user.update({
        data: { password: await encryptPassword(password) },
        where: { id: userId }
    });
};

const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    });
};

export default {
    findUserByEmail,
    updatePassword
};
