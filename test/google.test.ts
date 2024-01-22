import axios from "axios";
import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";

import {
  getGoogleUserBirthDateAndGender,
  validateGoogleAccessToken,
} from "../src/logic/AuthBL";
import initApp from "../src/app";
import * as AuthBLModule from "../src/logic/AuthBL";

import User from "../src/data/models/User";
import { GENDERS } from "../src/data/models/Gender";

jest.mock("axios");

describe("validateGoogleAccessToken", () => {
  it("should return true for a valid access token", async () => {
    const mockResponse = {
      data: {
        audience: process.env.GOOGLE_CLIENT_ID,
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);
    const result = await validateGoogleAccessToken("validAccessToken");
    expect(result).toBe(true);
  });
  it("should throw an error for an invalid client ID", async () => {
    const mockResponse = {
      data: {
        audience: "invalidClientID",
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);
    await expect(
      validateGoogleAccessToken("validAccessToken")
    ).rejects.toThrowError("Invalid client ID");
  });
  it("should throw an error for an invalid access token", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Some network error"));
    await expect(
      validateGoogleAccessToken("invalidAccessToken")
    ).rejects.toThrowError("Invalid access token");
  });
});

describe("getGoogleUserBirthDateAndGender", () => {
  it("should return gender and birthDate", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const mockData = {
      data: {
        genders: [{ value: "male" }],
        birthdays: [{}, { date: { year: 1990, month: 5, day: 15 } }],
      },
    };

    mockedAxios.get.mockResolvedValue(mockData);

    const result = await getGoogleUserBirthDateAndGender(
      "googleId",
      "accessToken"
    );

    expect(result).toEqual({
      gender: GENDERS.MALE,
      birthDate: new Date(Date.UTC(1990, 4, 15, 0, 0, 0)),
    });
  });
});

describe("POST api/auth/google", () => {
  let app: Express;

  const validAccessToken = "mockAccessToken";
  let mockedValidateGoogleAccessToken, mockedGetGoogleUserBirthDateAndGender;

  beforeAll(async () => {
    app = await initApp();

    await User.deleteMany();
    jest.resetAllMocks();

    mockedValidateGoogleAccessToken = jest.spyOn(
      AuthBLModule,
      "validateGoogleAccessToken"
    );
    mockedGetGoogleUserBirthDateAndGender = jest.spyOn(
      AuthBLModule,
      "getGoogleUserBirthDateAndGender"
    );

    mockedValidateGoogleAccessToken.mockImplementation(
      async (accessToken: string) => {
        if (accessToken === validAccessToken) return true;
        else throw new Error("invalid access token");
      }
    );
    mockedGetGoogleUserBirthDateAndGender.mockResolvedValue({
      birthDate: new Date(Date.UTC(1990, 4, 15, 0, 0, 0)),
      gender: GENDERS.MALE,
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  test("register with google", async () => {
    const response = await request(app).post("/api/auth/google").send({
      googleId: "mockGoogleId",
      email: "mock@example.com",
      accessToken: validAccessToken,
      firstName: "John",
      lastName: "Doe",
      imgSrc: "mockImageSrc",
    });

    expect(response.statusCode).toBe(200);
    const accessToken = response.body.accessToken;
    const refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  test("login exist account with google", async () => {
    const existUser = new User({
      firstName: "firstName",
      lastName: "lastName",
      email: "existUser.com",
      password: "test",
      birthDate: Date.now(),
      gender: "זכר",
    });
    await existUser.save();

    const response = await request(app).post("/api/auth/google").send({
      googleId: "mockGoogleId",
      email: "existUser.com",
      accessToken: validAccessToken,
      firstName: "John",
      lastName: "Doe",
      imgSrc: "mockImageSrc",
    });

    expect(response.statusCode).toBe(200);
    const accessToken = response.body.accessToken;
    const refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  test("bad google access token", async () => {
    const response = await request(app).post("/api/auth/google").send({
      googleId: "mockGoogleId",
      email: "mock@example.com",
      accessToken: "invalid",
      firstName: "John",
      lastName: "Doe",
      imgSrc: "mockImageSrc",
    });

    expect(response.statusCode).toBe(500);
  });
});
