const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Zboruri = sequelize.define('Zboruri', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  aeroport_plecare: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  aeroport_sosire: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  data_plecare: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_sosire: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pret: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  companie: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  clasa: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
}, {
  tableName: 'Zboruri',  // Asigură-te că numele tabelei este corect
});

// Test sincronizare
Zboruri.sync()
  .then(
    // () => console.log('Tabelul zboruri a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului zboruri:', error));

module.exports = Zboruri;
