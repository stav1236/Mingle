import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";

import initApp from "../src/app";
import User from "../src/data/models/User";
import path from "path";

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

describe("GET api/users/:userId ", () => {
  test("get exists user", async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });
  test("get exists user specific field", async () => {
    const projection = {
      firstName: 1,
      lastName: 1,
    };
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .query({ projection })
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("firstName");
    expect(response.body).toHaveProperty("lastName");
    expect(response.body).not.toHaveProperty("email");
  });
  test("get exists user without auth token", async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(401);
  });
  test("get exists user with bad auth token", async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", "Bearer " + accessToken + "bad");
    expect(response.statusCode).toBe(403);
  });
  test("get no exists user", async () => {
    const response = await request(app)
      .get(`/api/users/${new mongoose.Types.ObjectId().toString()}`)
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(404);
  });
  test("get user with error", async () => {
    const response = await request(app)
      .get(`/api/users/invalidId`)
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(500);
  });
});

describe("PUT api/users/:field/:value", () => {
  it("should update user details", async () => {
    const field = "firstName";
    const value = "NewFirstName";

    const response = await request(app)
      .put(`/api/users/${field}/${value}`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body[field]).toBe(value);
  });
  it("try update unexist field", async () => {
    const response = await request(app)
      .put("/api/users/unexist/invalidValue")
      .set("Authorization", "Bearer " + accessToken);

    expect(response.body).not.toHaveProperty("unexist");
  });
  it("try update _id", async () => {
    const response = await request(app)
      .put("/api/users/_id/65945e6cc84ee4cf9896bc70")
      .set("Authorization", "Bearer " + accessToken)
      .expect(500);

    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});

describe("POST api/users/avatar", () => {
  it("should update user avatar", async () => {
    const filePath = path.join(__dirname, "assets", "test.png");

    const response = await request(app)
      .post("/api/users/avatar")
      .set("Authorization", "Bearer " + accessToken)
      .attach("image", filePath)
      .expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.imgSrc).toBeDefined();
  });
  it("not support image type", async () => {
    const filePath = path.join(__dirname, "assets", "giphy.gif");

    const response = await request(app)
      .post("/api/users/avatar")
      .set("Authorization", "Bearer " + accessToken)
      .attach("image", filePath)
      .expect(500);

    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});
