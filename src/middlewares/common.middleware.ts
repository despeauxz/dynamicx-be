import dotenv from "dotenv";
import { Env } from "../env";
import { Response } from "../utils";
import * as Helpers from "../utils/helpers";

dotenv.config({ path: "../../env" });

export const authenticateToken = async (req, res, next) => {
    const secret = Env.secretKey;
    const authToken = req.headers.authorization;
    if (!authToken) return Response.error(res, "Unauthorized", 401);
    const tokensArray = authToken.split(" ");
    const token = tokensArray[1];
    
    if (!secret) return Response.error(res, "Invalid secret key.", 500);
    
    const decoded: any = await Helpers.verifyToken(token, secret);
    if (decoded.name) return Response.error(res, "Unauthorized", 401);

    req.id = decoded.id;
    next();
};
