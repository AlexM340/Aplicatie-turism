const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 



const Permisiuni = sequelize.define('permisiuni', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      denumire: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      valoare: {
        type: Sequelize.STRING(200),
        allowNull: false,
      }
}, {
  tableName: 'permisiuni',  // Specifică numele corect al tabelei
});

// Test sincronizare
Permisiuni.sync()
  .then(
    // () => console.log('Tabelul permisiuni a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului permisiuni:', error));

module.exports = Permisiuni;
