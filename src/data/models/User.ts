/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - birthDate
 *         - gender
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         birthDate:
 *           type: string
 *           format: date
 *           description: The user's birth date
 *         gender:
 *           type: string
 *           enum: [ 'male', 'female', 'other' ]
 *           description: The user's gender
 *         tokens:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user tokens
 *         imgSrc:
 *           type: string
 *           description: URL to the user's image
 *       example:
 *         firstName: 'John'
 *         lastName: 'Doe'
 *         email: 'john.doe@example.com'
 *         password: 'password123'
 *         birthDate: '1990-01-01'
 *         gender: 'male'
 *         tokens: ['token1', 'token2']
 *         imgSrc: 'https://example.com/profile.jpg'
 */

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
  imgSrc?: string;
}

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: [...Object.values(GENDERS)], required: true },
  tokens: { type: [String] },
  imgSrc: { type: String },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

const User = mongoose.model<User>("User", userSchema);

export default User;
