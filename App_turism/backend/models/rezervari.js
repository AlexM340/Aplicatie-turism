const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const Pachete = require('./pachete'); // Importă modelul pachete
const Clienti = require('./clienti'); // Importă modelul clienti


const Rezervari = sequelize.define('rezervari', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pachet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pachete', // Numele modelului la care se face referința
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      id_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clienti', // Numele modelului la care se face referința
          key: 'id',
        },
        onDelete: 'CASCADE',
      }
}, {
  tableName: 'rezervari',  // Specifică numele corect al tabelei
});

// Test sincronizare
Rezervari.sync()
  .then(
    // () => console.log('Tabelul rezervari a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului rezervari:', error));

module.exports = Rezervari;
