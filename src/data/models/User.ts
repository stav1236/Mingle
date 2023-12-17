import mongoose, { Schema, Document } from "mongoose";

import { GENDERS, Gender } from "./Gender";

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: Gender;
  tokens?: String[];
}

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: [...Object.values(GENDERS)], required: true },
  tokens: { type: [String] },
});

const User = mongoose.model<User>("User", userSchema);

export default User;
