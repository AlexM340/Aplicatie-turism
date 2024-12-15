const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../database'); 
const Rezervari = require('./rezervari'); // Importă modelul rezervari


const Tranzactii = sequelize.define('Tranzactii', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_rezervare: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Rezervari, // Numele modelului la care se face referința
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
Tranzactii.associate = (models) => {
  Tranzactii.belongsTo(models.Rezervari, { 
    foreignKey: "id_rezervare", 
    as: "rezervare"  
  });
};

module.exports = Tranzactii;
