import bcrypt from "bcrypt";

export const encryptPassword = async (password: string) => {
    const encryptedPassword = bcrypt.hashSync(password, 8);
    return encryptedPassword;
};

export const isPasswordMatch = async (password: string, userPassword: string) => {
    return bcrypt.compareSync(password, userPassword);
};
