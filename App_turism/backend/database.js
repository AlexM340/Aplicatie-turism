const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'dataBaseSettings.env') });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
    }
);

// Testează conexiunea
sequelize.authenticate()
  .then(() => console.log('Conexiunea la baza de date a fost realizată cu succes.'))
  .catch(err => console.error('Nu s-a putut conecta la baza de date:', err));

module.exports = sequelize;
