const { DataTypes } = require("sequelize");
const { sequelize } = require("../database"); 

const Tari = sequelize.define(
  "Tari",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    denumire: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    tableName: "tari", 
  }
);

Tari.associate = (models) => {
  Tari.hasMany(models.Localitati, {
    foreignKey: "id_tara",
    as: "localitati",
  });

  Tari.hasMany(models.Cazare, {
    foreignKey: "id_tara",
    as: "cazari",
  });
};

module.exports = Tari;
