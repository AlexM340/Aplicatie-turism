const express = require('express');
const allTablesController = require('./routes/allTablesRoutes');  // Ensure this path is correct
const cors = require('cors');  // Import CORS
const sequelize = require('./database');  // Ensure sequelize connection is established
const path = require('path');
const { getPachete } = require('./controllers/allTablesController');
require('dotenv').config({ path: path.resolve(__dirname, 'dataBaseSettings.env') });  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
const router = express.Router();
app.use('/',router);
router.get('/api/pachete', getPachete);
// console.log("Request")

// Enable CORS with specific origin

// Define routes
// app.use('/api', allTablesController);  // Make sure allTablesController is correctly configured in routes

// Start the server
app.listen(PORT, async () => {
  try {
    // Test the Sequelize connection
    await sequelize.authenticate();
    // console.log('Sequelize connected successfully');
    
    // console.log(`Express server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
