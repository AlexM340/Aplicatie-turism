const { Sequelize, DataTypes } = require("sequelize");
const {sequelize} = require("../database"); // Importă conexiunea
const Cazare = require("./cazare");

const Camere = sequelize.define(
  "Camere",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cazare: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Cazare, // Numele modelului la care se face referința
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    nr_persoane: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    descriere: {
      type: Sequelize.STRING(600),
      allowNull: false,
    },
    pret: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Camere", // Specifică numele corect al tabelei
  }
);
Camere.associate = (models) => {
  Camere.belongsTo(models.Cazare, { foreignKey: "id_cazare", as: "cazare" });
  Camere.hasMany(models.Pachete, {
    foreignKey: "id_camera",
    as: "pachete",
  });
};

module.exports = Camere;
