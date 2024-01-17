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
let accessToken: string, refreshToken: string, oldRefreshToken: string;

beforeAll(async () => {
  app = await initApp();

  await User.deleteMany();
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("POST api/auth/register ", () => {
  test("register new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(TEST_USER);
    expect(response.statusCode).toBe(200);
  });

  test("register existed user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(TEST_USER);
    expect(response.statusCode).toBe(400);
  });

  test("register bad user", async () => {
    const response = await request(app).post("/api/auth/register").send({});
    expect(response.statusCode).toBe(500);
  });
});

describe("POST api/auth/login ", () => {
  test("login seccess", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: TEST_USER.email, password: TEST_USER.password });
    expect(response.statusCode).toBe(200);
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  test("login non exist user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "no exist",
      password: TEST_USER.password,
    });
    expect(response.statusCode).toBe(401);
  });

  test("login with bad password to exist user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: TEST_USER.email,
      password: "bad password",
    });
    expect(response.statusCode).toBe(401);
  });
});

describe("POST api/auth/refresh-token ", () => {
  test("refresh-token seccess", async () => {
    const response = await request(app)
      .post("/api/auth/refresh-token")
      .send({ refreshToken });

    expect(response.statusCode).toBe(200);

    oldRefreshToken = refreshToken;
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
    expect(refreshToken).not.toBe(oldRefreshToken);
  });

  test("use new refresh token", async () => {
    const response = await request(app)
      .post("/api/auth/refresh-token")
      .send({ refreshToken });

    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();

    expect(response.statusCode).toBe(200);
  });

  test("reuse refresh token", async () => {
    const response = await request(app)
      .post("/api/auth/refresh-token")
      .send({ refreshToken: oldRefreshToken });

    expect(response.statusCode).toBe(403);
  });

  test("empty refresh-token", async () => {
    const response = await request(app)
      .post("/api/auth/refresh-token")
      .send({});

    expect(response.statusCode).toBe(401);
  });
});

describe("POST api/auth/logout ", () => {
  test("logout seccess", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: TEST_USER.email, password: TEST_USER.password });
    refreshToken = loginResponse.body.refreshToken;

    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", "Bearer " + refreshToken);

    expect(response.statusCode).toBe(200);
  });

  test("try logout with same token twice", async () => {
    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", "Bearer " + refreshToken);

    expect(response.statusCode).toBe(403);
  });

  test("logout without token", async () => {
    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", "Bearer ");

    expect(response.statusCode).toBe(401);
  });
});
