import { Express } from "express";

import initApp from "../src/app";
import User from "../src/data/models/User";
import mongoose from "mongoose";

let app: Express;

beforeEach(async () => {
  app = await initApp();

  await User.deleteMany();
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("GET / ", () => {
  test("It should respond hello", async () => {
    expect("hello").toEqual("hello");
  });
});
