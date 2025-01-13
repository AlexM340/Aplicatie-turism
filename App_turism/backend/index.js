const express = require("express");
const allTablesController = require("./routes/allTablesRoutes");
const cors = require("cors");
const { testConnection } = require("./database");
const syncDatabase = require("./syncDatabase");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
require("dotenv").config({
  path: path.resolve(__dirname, "dataBaseSettings.env"),
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", allTablesController);
app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await testConnection();

    // await syncDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); 
  }
};

startServer();
