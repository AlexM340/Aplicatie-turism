// const mysql = require('mysql2');

// //Creaza conexiunea

// const conexiune = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: 'turism'
// });

// module.exports = conexiune;

//Facem cu migrare

const {Sequelize} = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'dataBaseSettings.env') });

//Configuram conexiunea

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

module.exports = sequelize;
