const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../database'); 
const Clienti = require('./clienti');

const Clienti_detalii = sequelize.define('Clienti_detalii', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Clienti, 
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
  tableName: 'clienti_detalii', 
});
Clienti_detalii.associate = (models) =>{
  Clienti_detalii.belongsTo(models.Clienti,{foreignKey:'id_client', as:"client"})
}

module.exports = Clienti_detalii;
