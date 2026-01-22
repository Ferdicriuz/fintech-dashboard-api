module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupDB.js"],
  testMatch: ["**/tests/**/*.test.js"],
  clearMocks: true
};
