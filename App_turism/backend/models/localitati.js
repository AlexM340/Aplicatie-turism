const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Tari = require("./tari"); // Importă modelul tari

const Localitati = sequelize.define(
  "localitati",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    denumire: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    id_tara: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "tari", // Numele modelului la care se face referința
        key: "id",
      },
      onDelete: "CASCADE",
    },
    imagine: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
  },
  {
    tableName: "localitati", 
  }
);

Localitati.associate = (models) => {
  Localitati.belongsTo(models.Tari, {
    foreignKey: "id_tara",
    as: "tara",
  });

  Localitati.hasMany(models.Zboruri, {
    foreignKey: "id_loc_plecare", 
    as: "zboruriPlecare", 
  });

  Localitati.hasMany(models.Zboruri, {
    foreignKey: "id_loc_sosire", 
    as: "zboruriSosire", 
  });
  Localitati.hasMany(models.Cazare, {
    foreignKey: "id_loc",
    as: "cazari",
  });
};

// Test sincronizare
Localitati.sync()
  .then
  // () => console.log('Tabelul localitati a fost sincronizat cu succes.')
  ()
  .catch((error) =>
    console.error("Eroare la sincronizarea tabelului localitati:", error)
  );

module.exports = Localitati;
