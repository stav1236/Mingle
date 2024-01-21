import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";

import initApp from "../src/app";
import User from "../src/data/models/User";
import axios from "axios";
import { getRelevetDataForUser } from "../src/logic/CryptoBL";

jest.mock("axios");

let app: Express;

const TEST_USER = {
  firstName: "firstName",
  lastName: "lastName",
  email: "test",
  password: "test",
  birthDate: Date.UTC(2001, 7, 11, 0, 0, 0),
  gender: "זכר",
};
let accessToken: string, refreshToken: string, userId: string;

beforeAll(async () => {
  app = await initApp();

  await User.deleteMany();
  const testUser = new User(TEST_USER);
  testUser.password =
    "$2b$10$l6s/qb7E3gAsMLtx97huiOzxBmIRm1Rrg50/Gi.JW0yJ1rM7TPORy"; //test
  await testUser.save();

  const response = await request(app)
    .post("/api/auth/login")
    .send({ email: TEST_USER.email, password: TEST_USER.password });

  userId = response.body._id;
  accessToken = response.body.accessToken;
  refreshToken = response.body.refreshToken;
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("GET api/crypto/:amount/:curreny ", () => {
  it("should return relevant data for the user", async () => {
    const mockData = {
      data: {
        data: [
          {
            name: "Bitcoin",
            symbol: "BTC",
            cmc_rank: 1,
            quote: {
              USD: {
                price: 50000,
                last_updated: "2024-01-21T12:34:56.789Z",
              },
            },
          },
        ],
      },
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockData
    );

    const response = await request(app)
      .get(`/api/crypto/10/USD`)
      .set("Authorization", "Bearer " + accessToken);

    const expectedData = getRelevetDataForUser(mockData.data.data, "USD");

    expect(response.body).toEqual(expectedData);
    const cryptoArr = response.body;
    const lastItem = cryptoArr.pop();
    expect(lastItem).toHaveProperty("name");
    expect(lastItem).toHaveProperty("symbol");
    expect(lastItem).toHaveProperty("rank");
    expect(lastItem).toHaveProperty("price");
    expect(lastItem).toHaveProperty("lastUpdated");
  });

  it("should handle errors and return 500 status", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error("Mocked error")
    );

    const response = await request(app)
      .get(`/api/crypto/10/USD`)
      .set("Authorization", "Bearer " + accessToken);

    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});

describe("GET api/crypto/mingle ", () => {
  test("get mingle coin", async () => {
    const limit = 10;
    const response = await request(app)
      .get(`/api/crypto/mingle`)
      .set("Authorization", "Bearer " + accessToken);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("symbol");
    expect(response.body).toHaveProperty("price");
    const price = parseFloat(response.body.price) as number;
    expect(price).toBeGreaterThanOrEqual(1.5);
    expect(price).toBeLessThanOrEqual(1.98);

    expect(response.body).toHaveProperty("date");
  });
});
