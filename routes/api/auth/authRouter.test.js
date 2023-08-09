import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { app } from "../../../app.js";
import User from "../../../models/user.js";

const { PORT, DB_HOST } = process.env;

describe("test login route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  //   afterEach(async () => {
  //     await User.deleteMany({});
  //   });

  it("test login with correct data", async () => {
    const loginData = {
      email: "liza.diachenko.99@gmail.com",
      password: "_DM7WIx5nI51GjM",
    };

    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();

    const user = await User.findOne({ email: loginData.email });
    expect(user).toBeDefined();
    expect(user.email).toEqual(expect.any(String));
    expect(user.email).toBe(loginData.email);
    expect(user.subscription).toEqual(expect.any(String));
    expect(["bussiness", "pro", "starter"]).toContain(user.subscription);
  });
});
