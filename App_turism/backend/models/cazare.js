const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 
console.log("cazare");
const Cazare = sequelize.define('Cazare', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nume: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  telefon: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  descriere: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  adresa: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'Cazare',  // Specifică numele corect al tabelei
});

// Test sincronizare
Cazare.sync()
  .then(
    // () => console.log('Tabelul cazare a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului cazare:', error));

module.exports = Cazare;
