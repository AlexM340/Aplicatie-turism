const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const Clienti = require('./clienti'); // Importă modelul clienti
const Localitati = require('./localitati'); // Importă modelul localitati

const Clienti_detalii = sequelize.define('clienti_detalii', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clienti', // Numele modelului la care se face referința
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      telefon: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      adresa: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      cnp: {
        type: Sequelize.STRING(20),
        allowNull: false,
      }
}, {
  tableName: 'clienti_detalii',  // Specifică numele corect al tabelei
});
Clienti_detalii.associate = (models) =>{
  Clienti_detalii.belongsTo(models.Clienti,{foreignKey:'id_client', as:"client"})
}

// Test sincronizare
Clienti_detalii.sync()
  .then(
    // () => console.log('Tabelul clienti_detalii a fost sincronizat cu succes.')
  )
  .catch((error) => console.error('Eroare la sincronizarea tabelului clienti_detalii:', error));

module.exports = Clienti_detalii;
