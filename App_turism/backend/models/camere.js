const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importă conexiunea
const Cazare = require('./cazare'); // Importă modelul Cazare

const Camere = sequelize.define('Camere', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_hotel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cazare, // Numele modelului la care se face referința
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  nr_persoane: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descriere: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pret: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Camere',  // Specifică numele corect al tabelei
});

// Testam sincronizarea
Camere.sync()
  .then(() => console.log('Tabelul camere a fost sincronizat cu succes.'))
  .catch((error) => console.error('Eroare la sincronizarea tabelului camere:', error));

module.exports = Camere;
