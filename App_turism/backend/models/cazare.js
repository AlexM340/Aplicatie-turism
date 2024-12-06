const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const Tari = require('./tari'); // Importă modelul tari
const Localitati = require('./localitati'); // Importă modelul localitati


const Cazare = sequelize.define('cazare', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nume: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  telefon: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
  descriere: {
    type: Sequelize.STRING(600),
    allowNull: false,
  },
  id_tara: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tari',// Numele modelului la care se face referința
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_loc: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'localitati',// Numele modelului la care se face referința
      key: 'id',
    },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'cazare',  // Specifică numele corect al tabelei
});

// Test sincronizare
Cazare.sync()
  .then(
    // () => console.log('Tabelul cazare a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului cazare:', error));

module.exports = Cazare;
