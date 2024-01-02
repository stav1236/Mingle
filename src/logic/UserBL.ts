import { ProjectionType } from "mongoose";
import User from "../data/models/User";

export const getUserById = async (
  _id: string,
  projection?: ProjectionType<User>
) => {
  const user = await User.findById(_id, projection);
  return user;
};

export const updateAvatar = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const imgSrc = req?.file?.path?.replace("\\", "/");
    if (imgSrc) {
      const user = await User.findByIdAndUpdate(
        userId,
        { imgSrc },
        { new: true }
      );
      if (user) {
        return res.status(200).json(user);
      }
    }

    res.status(500).json({ error: "Internal Server Error" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserDetails = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const value = req.params.value;
    const field = req.params.field;
    const user = await User.findByIdAndUpdate(
      userId,
      { [field]: value },
      { new: true }
    );

    if (user) {
      return res.status(200).json(user);
    }

    res.status(500).json({ error: "Internal Server Error" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
