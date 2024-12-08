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
Tari.associate = (models) => {
  Tari.hasMany(models.Localitati, {
    foreignKey: 'id_tara',
    as: 'localitati',
  });
  Tari.hasMany(models.Cazare, { 
    foreignKey: "id_tara", 
    as: "cazari" 
  });
};

// Test sincronizare
Tari.sync()
  .then(
    // () => console.log('Tabelul tari a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului tari:', error));

module.exports = Tari;
