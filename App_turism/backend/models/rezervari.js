const { DataTypes } = require('sequelize');
const { sequelize } = require('../database'); // Import the sequelize connection
const Pachete = require('./pachete'); // Import the 'Pachete' model
const Clienti = require('./clienti'); // Import the 'Clienti' model

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
        model: Pachete, // Referencing 'pachete' model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:Clienti, // Referencing 'clienti' model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'rezervari', // Ensure correct table name
  }
);

// Associations
Rezervari.associate = (models) => {
  Rezervari.belongsTo(models.Pachete, {
    foreignKey: 'id_pachet',
    as: 'pachet',
  });

  Rezervari.belongsTo(models.Clienti, {
    foreignKey: 'id_client',
    as: 'client',
  });

  // Assuming you have a 'Tranzactii' model for transaction details related to reservations
  Rezervari.hasMany(models.Tranzactii, {
    foreignKey: 'id_rezervare',
    as: 'tranzactii',
  });
};

module.exports = Rezervari;
