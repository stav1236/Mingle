import axios from "axios";
import { validateGoogleAccessToken } from "../src/logic/AuthBL";

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
