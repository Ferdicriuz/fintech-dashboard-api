// const request = require("supertest");
// const app = require("../app");
// const User = require("../models/User");
// const Transaction = require("../models/Transaction");

// let token;
// let userId;

// describe("Dashboard API", () => {
//   beforeEach(async () => {
//     await User.deleteMany();
//     await Transaction.deleteMany();

//     const user = await User.create({
//     name: "Test User",
//     email: "test@example.com",
//     password: "123456"
//   });

//     userId = user._id;

//     const res = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "dash@example.com",
//         password: "password123"
//       });

//   // Generate token using same logic as in authController
//   token = generateToken(user._id);

//     // Optional: create a transaction to test history
//   await Transaction.create({
//     user: user._id,
//     amount: 500,
//     type: "credit",
//     balanceAfter: 500,
//     description: "Initial deposit"
//   });
// });

//   it("should allow access to dashboard with token", async () => {
//     const res = await request(app)
//       .get("/api/transactions")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//   });

//   it("should return user transaction history", async () => {
//     const res = await request(app)
//       .get("/api/transactions")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.transactions.length).toBeGreaterThan(0);
//   });
// });


const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { generateToken } = require("../utils/generateToken");

let token, userId;

beforeEach(async () => {
  await User.deleteMany();
  await Transaction.deleteMany();

  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  });
  userId = user._id;
  token = generateToken(user._id);

  await Transaction.create({
    user: user._id,
    amount: 500,
    type: "credit",
    balanceAfter: 500,
  });
});

describe("Dashboard API", () => {
  it("should allow access to dashboard with token", async () => {
    const res = await request(app)
      .get("/api/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it("should return user transaction history", async () => {
    const res = await request(app)
      .get("/api/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.transactions.length).toBeGreaterThan(0);
  });
});
