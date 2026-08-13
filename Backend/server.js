require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/db");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();