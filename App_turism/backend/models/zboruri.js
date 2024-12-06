const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const Tari = require('./tari'); // Importă modelul tari
const Localitati = require('./localitati'); // Importă modelul localitati

const Zboruri = sequelize.define('zboruri', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  aeroport_plecare: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  aeroport_sosire: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  id_loc_plecare: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'localitati',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_tara_plecare: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tari',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_loc_sosire: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'localitati',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_tara_sosire: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tari',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  data_plecare: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  data_sosire: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  companie: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  pret: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  clasa: {
    type: Sequelize.STRING(200),
    allowNull: false,
  }
}, {
  tableName: 'zboruri',  // Asigură-te că numele tabelei este corect
});

// Test sincronizare
Zboruri.sync()
  .then(
    // () => console.log('Tabelul zboruri a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului zboruri:', error));

module.exports = Zboruri;
