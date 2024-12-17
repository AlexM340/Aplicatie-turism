const { DataTypes } = require("sequelize");
const { sequelize } = require("../database"); // Import the sequelize connection

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
    tableName: "tari", // Ensure the table name matches the database table
  }
);

// Associations
Tari.associate = (models) => {
  // One country can have many cities
  Tari.hasMany(models.Localitati, {
    foreignKey: "id_tara",
    as: "localitati",
  });

  // One country can have many accommodations
  Tari.hasMany(models.Cazare, {
    foreignKey: "id_tara",
    as: "cazari",
  });
};

module.exports = Tari;
