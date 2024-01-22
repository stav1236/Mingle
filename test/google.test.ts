import axios from "axios";
import {
  getGoogleUserBirthDateAndGender,
  validateGoogleAccessToken,
} from "../src/logic/AuthBL";
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
