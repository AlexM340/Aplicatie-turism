// index.js

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Import CORS
require('dotenv').config(); // To use environment variables from the .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Test route
app.get('/test', (req, res) => {
  res.send('Welcome to the Express backend!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

