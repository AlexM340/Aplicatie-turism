const express = require("express");
const allTablesController = require("./routes/allTablesRoutes"); // Ensure this path is correct
const cors = require("cors"); // Import CORS
const { testConnection} = require("./database"); // Ensure sequelize connection is established
const syncDatabase = require("./syncDatabase")
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "dataBaseSettings.env"),
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Define routes
app.use("/api", allTablesController); // Make sure allTablesController is correctly configured in routes


const startServer = async () => {
  try {
    await testConnection()

    // await syncDatabase();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Exit the process if initialization fails
  }
};

startServer();
