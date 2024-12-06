const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importă conexiunea
const Cazare = require('./cazare'); // Importă modelul Cazare

const Camere = sequelize.define('Camere', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_cazare: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'cazare',// Numele modelului la care se face referința
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  nr_persoane: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  descriere: {
    type: Sequelize.STRING(600),
    allowNull: false,
  },
  pret: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Camere',  // Specifică numele corect al tabelei
});

// Testam sincronizarea
Camere.sync()
  .then(
    // () => console.log('Tabelul camere a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului camere:', error));

module.exports = Camere;
