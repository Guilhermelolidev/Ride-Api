import moment, { Moment } from "moment";
import jwt from "jsonwebtoken";

const generateToken = (
    userId: number,
    expires: Moment,
    secret = `${process.env.JWT_SECRET}`
): string => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix()
    };

    return jwt.sign(payload, secret);
};
const generateAuthTokens = async (user: { id: number }) => {
    const accessTokenExpires = moment().add(
        `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}`,
        "minutes"
    );

    const accessToken = generateToken(user.id, accessTokenExpires);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        }
    };
};

export default {
    generateAuthTokens,
    generateToken
};
