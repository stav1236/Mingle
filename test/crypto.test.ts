import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";

import initApp from "../src/app";
import User from "../src/data/models/User";

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
  test("crypto with limit", async () => {
    const limit = 10;
    const response = await request(app)
      .get(`/api/crypto/${limit}/USD`)
      .set("Authorization", "Bearer " + accessToken);

    expect(response.statusCode).toBe(200);
    const cryptoArr = response.body;

    expect(cryptoArr.length).toBe(limit);

    const lastItem = cryptoArr.pop();

    expect(lastItem).toHaveProperty("name");
    expect(lastItem).toHaveProperty("symbol");
    expect(lastItem).toHaveProperty("rank");
    expect(lastItem).toHaveProperty("price");
    expect(lastItem).toHaveProperty("lastUpdated");
  });
  test("bad crypto request", async () => {
    const response = await request(app)
      .get(`/api/crypto/bad/verybad`)
      .set("Authorization", "Bearer " + accessToken);

    expect(response.statusCode).toBe(500);
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
