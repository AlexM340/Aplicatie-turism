const express = require('express');
const cors = require('cors'); 
const sequelize = require('./database');
const path = require('path');
const authRoutes = require('./routes/authRoutes'); 
const { getPachete } = require('./controllers/allTablesController'); 
require('dotenv').config({ path: path.resolve(__dirname, 'dataBaseSettings.env') }); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware-uri
app.use(express.json()); // Parsează cererile JSON
app.use(cors()); // Activează CORS

// Rute
app.get('/api/pachete', getPachete);
app.use('/api/auth', authRoutes);


app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
