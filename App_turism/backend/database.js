const mysql = require('mysql2');

//Creaza conexiunea

const conexiune = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'turism'
});

module.exports = conexiune;
