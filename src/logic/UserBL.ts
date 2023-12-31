import { ProjectionType } from "mongoose";
import User from "../data/models/User";

export const getUserById = async (
  _id: string,
  projection?: ProjectionType<User>
) => {
  const user = await User.findById(_id, projection);
  return user;
};
