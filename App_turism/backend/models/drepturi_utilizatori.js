const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Angajati = require("./angajati");
const Permisiuni = require("./permisiuni"); 

const Drepturi_utilizatori = sequelize.define(
  "Drepturi_utilizatori",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_angajat: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Angajati, 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_permisiune: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Permisiuni, 
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "drepturi_utilizatori", 
  }
);

Drepturi_utilizatori.associate = (models) => {
  Drepturi_utilizatori.belongsTo(models.Angajati, {
    foreignKey: "id_angajat",
    as: "angajat",
  });

  Drepturi_utilizatori.belongsTo(models.Permisiuni, {
    foreignKey: "id_permisiune",
    as: "permisiune",
  });
};

module.exports = Drepturi_utilizatori;
