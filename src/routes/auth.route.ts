import { Router } from "express";
import { validateData } from "../middlewares/validation.middleware";
import * as userValidator from "../utils/validate/user.validate";
import { AuthValidator } from "../validators";
import { AuthController } from "../controllers";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateData(userValidator.registerValidator),
  AuthController.registerController
);

authRouter.post(
  "/login",
  validateData(userValidator.userLoginValidator),
  AuthController.loginController
);
