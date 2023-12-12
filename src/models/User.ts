import mongoose, { Schema, Document } from "mongoose";
import { GENDERS, Gender } from "./Gender";

interface User extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: Gender;
}

const userSchema = new Schema<User>({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: [...Object.values(GENDERS)], required: true },
});

const User = mongoose.model<User>("User", userSchema);

export default User;
