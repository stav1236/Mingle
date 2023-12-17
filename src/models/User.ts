import { UUID } from "bson";
import mongoose, { Schema, Document } from "mongoose";
import { GENDERS, Gender } from "./Gender";

interface User extends Document {
  uuid: UUID;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: Gender;
}

const userSchema = new Schema<User>({
  uuid: { type: UUID, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: [...Object.values(GENDERS)], required: true },
});

const User = mongoose.model<User>("User", userSchema);

export default User;
