import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "../../utils/httpStatus";
import { Response } from "../../utils";

const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  const findUser = await userService.getOneUser({ username });
  if (!findUser) {
    return Response.error(res, "Invalid login credentials!", httpStatus.BAD_REQUEST);
  };
  if (findUser.deleted_at) return null;
  const compare = await comparePassword(password, findUser.password);
  if (!compare) {
    return Response.error(res, "Invalid login credentials!", httpStatus.BAD_REQUEST);
  };
  const {
    id,
    email,
    created_at,
    updated_at,
  } = findUser;
  
  const token = generateToken(findUser);

  return Response.success(res, "Login successful", {
    id,
    email,
    token,
    username,
    created_at,
    updated_at
  });

};

export const loginController = errorHandlerWrapper(loginHandler);
