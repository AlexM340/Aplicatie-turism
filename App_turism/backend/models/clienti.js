const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../database'); 


const Clienti = sequelize.define('Clienti', {
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
        allowNull: true,
      }
}, {
  timestamps: false, // Disable `createdAt` and `updatedAt`
  tableName: 'clienti',  // Specifică numele corect al tabelei
});

Clienti.associate = (models)=>{
  Clienti.hasOne(models.Clienti_detalii,{foreignKey:'id_client', as:"clienti_detalii"})
  Clienti.hasMany(models.Rezervari, { 
    foreignKey: "id_client", 
    as: "rezervari" 
  });
}

module.exports = Clienti;
