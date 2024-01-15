import mongoose from "mongoose";
import request from "superagent";
import { app } from "../src/server";

beforeAll((done) => {
  done();
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
