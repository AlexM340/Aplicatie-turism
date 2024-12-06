const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 


const Tari = sequelize.define('tari', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      denumire: {
        type: Sequelize.STRING(200),
        allowNull: false,
      }
}, {
  tableName: 'tari',  // Specifică numele corect al tabelei
});

// Test sincronizare
Tari.sync()
  .then(
    // () => console.log('Tabelul tari a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului tari:', error));

module.exports = Tari;
