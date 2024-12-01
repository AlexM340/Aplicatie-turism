const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importă conexiunea
const Camere = require('./camere'); // Importă modelul Camere
const Zboruri = require('./zboruri'); // Importă modelul Zboruri
const Pachete = sequelize.define('Pachete', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_camera: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Camere,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  id_zbor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Zboruri,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  data_sosire: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_plecare: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'pachete',  // Asigură-te că numele tabelei este corect
});

// Testăm sincronizarea
Pachete.sync()
  .then(
    // () => console.log('Tabelul pachete a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului pachete:', error));

module.exports = Pachete;
