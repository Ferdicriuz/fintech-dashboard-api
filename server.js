const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const app = require("./app"); // app must be imported AFTER dotenv

const PORT = process.env.PORT || 5000;

connectDB(); // DB first

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
