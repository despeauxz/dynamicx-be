import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export const createUser = async (data) => {
  const { username, email, password } = data;
  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOne({
    where: { email },
  });
  if (existingUser) return null;
  const user = userRepository.create({ username, email, password });
  await userRepository.save(user);
  return user;
};

export const getOneUser = async (data) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOne({ where: { ...data } });
  if (!findUser) return null;
  return findUser;
};
