const { DataTypes } = require('sequelize');
const { sequelize } = require('../database'); 
const Pachete = require('./pachete'); 
const Clienti = require('./clienti'); 

const Rezervari = sequelize.define(
  'Rezervari',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pachet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pachete,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:Clienti,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'rezervari', 
  }
);

Rezervari.associate = (models) => {
  Rezervari.belongsTo(models.Pachete, {
    foreignKey: 'id_pachet',
    as: 'pachet',
  });

  Rezervari.belongsTo(models.Clienti, {
    foreignKey: 'id_client',
    as: 'client',
  });

  Rezervari.hasMany(models.Tranzactii, {
    foreignKey: 'id_rezervare',
    as: 'tranzactii',
  });
};

module.exports = Rezervari;
