const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const Rezervari = require('./rezervari'); // Importă modelul rezervari


const Tranzactii = sequelize.define('tranzactii', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_rezervare: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rezervari', // Numele modelului la care se face referința
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      suma: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      achitat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data_tranzactie: {
        type: Sequelize.DATE,
        allowNull: false,
      }
}, {
  tableName: 'tranzactii',  // Specifică numele corect al tabelei
});

// Test sincronizare
Tranzactii.sync()
  .then(
    // () => console.log('Tabelul tranzactii a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului tranzactii:', error));

module.exports = Tranzactii;
