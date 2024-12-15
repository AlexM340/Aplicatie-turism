const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 


const Clienti = sequelize.define('clienti', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      nume: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      parola: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      data_creare: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      email: {
        type: Sequelize.STRING(200),
        unique: true,
        allowNull: true,
      }
}, {
  timestamps: false, // Disable `createdAt` and `updatedAt`
  tableName: 'clienti',  // Specifică numele corect al tabelei
});

// Test sincronizare
Clienti.sync()
  .then(
    () => console.log('Tabelul clineti a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului cazare:', error));

module.exports = Clienti;
