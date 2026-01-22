const mongoose = require("mongoose");

beforeAll(async () => {
  const mongoURI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fintech_test";

  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
