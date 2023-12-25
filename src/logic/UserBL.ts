import User from "../data/models/User";

export const getUserById = async (_id: string) => {
  const user = await User.findById(_id);
  return user;
};
