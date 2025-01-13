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
// console.log(process.env.DB_HOST)

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    // console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // throw error; // Propagate the error to be handled by the caller
  }
};

module.exports = { sequelize, testConnection };
