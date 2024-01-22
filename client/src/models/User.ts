import { Gender } from "./Gender";

export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  gender: Gender;
}
