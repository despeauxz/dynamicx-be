import jwt from "jsonwebtoken";


export const verifyToken = async (token, secret) => {
    return jwt.verify(token, secret, (err, data) => {
        if (err) return err;
        return data;
    });
};
