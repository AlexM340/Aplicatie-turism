const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Angajati = require("./angajati"); // Importă modelul angajati
const Permisiuni = require("./permisiuni"); // Importă modelul permisiuni

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
        model: Angajati, // Numele modelului la care se face referința
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_permisiune: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Permisiuni, // Numele modelului la care se face referința
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "drepturi_utilizatori", // Specifică numele corect al tabelei
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
