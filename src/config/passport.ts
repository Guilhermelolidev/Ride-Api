import { PrismaClient } from "@prisma/client";
import { ExtractJwt, Strategy as JwtStrategy, VerifyCallback } from "passport-jwt";

const prisma = new PrismaClient();

const jwtOptions = {
    secretOrKey: `${process.env.JWT_SECRET}`,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify: VerifyCallback = async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, name: true }
        });

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (err) {
        done(err, false);
    }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
