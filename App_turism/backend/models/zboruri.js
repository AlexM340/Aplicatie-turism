const { Sequelize, DataTypes } = require("sequelize");
const {sequelize} = require("../database");
const Tari = require("./tari"); // Importă modelul tari
const Localitati = require("./localitati"); // Importă modelul localitati

const Zboruri = sequelize.define(
  "Zboruri",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    aeroport_plecare: {
      type: Sequelize.STRING(200),
      allowNull: true,
      defaultValue:""
    },
    aeroport_sosire: {
      type: Sequelize.STRING(200),
      allowNull: true,
      defaultValue:""
    },
    id_loc_plecare: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Localitati,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    id_tara_plecare: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Tari,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    id_loc_sosire: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Localitati,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    id_tara_sosire: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Tari,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    data_plecare: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    data_sosire: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    companie: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    pret: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    clasa: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
  },
  {
    tableName: "zboruri", // Asigură-te că numele tabelei este corect
  }
);
Zboruri.associate = (models) => {
  // Relațiile declarate explicit
  Zboruri.belongsTo(models.Localitati, {
    foreignKey: "id_loc_plecare",
    as: "localitatePlecare",
  });
  Zboruri.belongsTo(models.Tari, {
    foreignKey: "id_tara_plecare",
    as: "taraPlecare",
  });
  Zboruri.belongsTo(models.Localitati, {
    foreignKey: "id_loc_sosire",
    as: "localitateSosire",
  });
  Zboruri.belongsTo(models.Tari, {
    foreignKey: "id_tara_sosire",
    as: "taraSosire",
  });
  Zboruri.hasMany(models.Pachete, { 
    foreignKey: "id_zbor", 
    as: "pachete" 
  });
};

module.exports = Zboruri;
