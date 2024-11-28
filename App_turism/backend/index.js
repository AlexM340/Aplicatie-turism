// index.js



const express = require('express');
// const conexiune = require('./database');
const cors = require('cors'); // Import CORS
const sequelize = require('./database');
require('dotenv').config(); // To use environment variables from the .env file

const app = express();
const PORT = process.env.PORT || 5000;



// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Test route
app.get('/test', async (req, res) => {
  try {
    // Testăm conexiunea cu baza de date
    await sequelize.authenticate();
    console.log('Conexiune la baza de date reușită!');
    res.status(200).send('Conexiunea cu baza de date este activă!');
  } catch (error) {
    console.error('Eroare la conectarea MySQL:', error.message);
    res.status(500).send('Eroare la conectarea cu baza de date.');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

