import { Env } from "../env";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const { secretKey } = Env;
  return `${jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 })}`;
};
