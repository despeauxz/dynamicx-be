import { userService } from "../../services";
import { errorHandlerWrapper, Response } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "../../utils/httpStatus";

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;
  const findUserByUsername = await userService.getOneUser({ username });
  const findUserByEmail = await userService.getOneUser({ email });
  if (findUserByUsername) {
    return Response.error(res, "Username already exist", httpStatus.BAD_REQUEST);
  };
  if (findUserByEmail) {
    return Response.error(res, "Email already exist", httpStatus.BAD_REQUEST);
  };
  const hashPassword = await encryptPassword(password);
  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
  });

  const {
    id,
    created_at,
    updated_at,
  } = user;

  return Response.success(res, "Account created successfully", {
    id,
    email,
    username,
    created_at,
    updated_at
  });
};

export const registerController = errorHandlerWrapper(registerHandler);
