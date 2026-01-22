const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Auth API", () => {
  beforeEach(async () => {
    await User.deleteMany();

    await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });
  });

  it("should login successfully with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should fail login with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword"
      });

    expect(res.statusCode).toBe(401);
  });
});
