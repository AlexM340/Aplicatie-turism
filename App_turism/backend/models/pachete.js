const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importă conexiunea
const Camere = require('./camere'); // Importă modelul camere
const Zboruri = require('./zboruri'); // Importă modelul zboruri

const Pachete = sequelize.define('pachete', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_camera: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'camere', // Numele modelului la care se face referința
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  id_zbor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'zboruri', // Numele modelului la care se face referința
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  data_plecare: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  data_sosire: {
    type: Sequelize.DATE,
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
