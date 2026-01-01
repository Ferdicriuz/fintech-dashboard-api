const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fintech Dashboard API running");
});

module.exports = app;
