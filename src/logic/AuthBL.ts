import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

import User from "../data/models/User";
import logger from "../common/config/logger";
import axios from "axios";
import { GENDERS } from "../data/models/Gender";

export const register = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, password, birthDate, gender } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthDate,
      gender,
    });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    logger.error("something went wrong while try to register new user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
      { _id: user._id, date: Date.now().toLocaleString() },
      process.env.REFRESH_TOKEN_SECRET as Secret
    );

    if (!user.tokens) user.tokens = [refreshToken];
    else user.tokens.push(refreshToken);
    await user.save();

    res.json({ accessToken, refreshToken, _id: user._id });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid credentials" });

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET as Secret,
    async (err: any, userInfo: any) => {
      if (err) return res.status(403).send(err.message);
      const userId = userInfo._id;
      try {
        const user = await User.findById(userId);
        if (!user) return res.status(403).send("invalid request");
        if (!user.tokens?.includes(token)) {
          user.tokens = [];
          await user.save();
          return res.status(403).send("invalid request");
        }

        user.tokens.splice(user.tokens.indexOf(token), 1);
        await user.save();

        res.status(200).send();
      } catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
};

export const refreshToken = async (req: any, res: any) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret,
    async (err: any, userInfo: any) => {
      if (err) return res.status(403).send(err.message);
      const userId = userInfo._id;

      try {
        const user = await User.findById(userId);
        if (!user) return res.status(403).send("invalid credentials");
        if (!user.tokens?.includes(refreshToken)) {
          user.tokens = [];
          await user.save();
          return res.status(403).send("invalid credentials");
        }

        const newAccessToken = jwt.sign(
          { _id: user._id },
          process.env.ACCESS_TOKEN_SECRET as Secret,
          { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
        );
        const newRefreshToken = jwt.sign(
          { _id: user._id, date: Date.now().toLocaleString() },
          process.env.REFRESH_TOKEN_SECRET as Secret
        );

        user.tokens[user.tokens.indexOf(refreshToken)] = newRefreshToken;
        await user.save();

        res.status(200).send({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          _id: user._id,
        });
      } catch (err: any) {
        res.status(403).send(err.message);
      }
    }
  );
};

export const validateGoogleAccessToken = async (accessToken: string) => {
  const invalidClientIDMessage = "Invalid client ID";
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const data = response?.data;

    if (data?.audience === process.env.GOOGLE_CLIENT_ID) {
      return true;
    } else {
      throw new Error(invalidClientIDMessage);
    }
  } catch (error: any) {
    if (error?.message === invalidClientIDMessage) throw error;
    throw new Error("Invalid access token");
  }
};

const getGoogleUserBirthDateAndGender = async (
  googleId: string,
  accessToken: string
) => {
  const res = await axios.get(
    `https://people.googleapis.com/v1/people/${googleId}?personFields=birthdays,genders&access_token=${accessToken}`
  );

  const data = res.data;

  const genderValue = data.genders[0].value;
  const gender =
    genderValue === "male"
      ? GENDERS.MALE
      : genderValue === "female"
      ? GENDERS.FEMALE
      : GENDERS.OTHER;

  const birthDateValue = data.birthdays[1].date;

  const birthDate = new Date(
    Date.UTC(
      birthDateValue.year,
      birthDateValue.month - 1,
      birthDateValue.day,
      0,
      0,
      0
    )
  );

  return { gender, birthDate };
};

export const handleGoogleAuth = async (req: any, res: any) => {
  try {
    const {
      googleId,
      email,
      accessToken: googleAccessToken,
      firstName,
      lastName,
      imgSrc,
    } = req.body;

    validateGoogleAccessToken(googleAccessToken);

    let user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(googleId, salt);
      const { birthDate, gender } = await getGoogleUserBirthDateAndGender(
        googleId,
        googleAccessToken
      );

      user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthDate,
        gender,
        imgSrc,
      });

      await user.save();
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
      { _id: user._id, date: Date.now().toLocaleString() },
      process.env.REFRESH_TOKEN_SECRET as Secret
    );

    if (!user.tokens) user.tokens = [refreshToken];
    else user.tokens.push(refreshToken);
    await user.save();

    res.json({ accessToken, refreshToken, _id: user._id });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
