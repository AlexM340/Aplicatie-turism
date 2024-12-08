const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Angajati = require("./angajati"); // Importă modelul angajati
const Permisiuni = require("./permisiuni"); // Importă modelul permisiuni

const Drepturi_utilizatori = sequelize.define(
  "drepturi_utilizatori",
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
        model: "angajati", // Numele modelului la care se face referința
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_permisiune: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "permisiuni", // Numele modelului la care se face referința
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
// Test sincronizare
Drepturi_utilizatori.sync()
  .then
  // () => console.log('Tabelul drepturi_utilizatori a fost sincronizat cu succes.')
  ()
  .catch((error) =>
    console.error(
      "Eroare la sincronizarea tabelului drepturi_utilizatori:",
      error
    )
  );

module.exports = Drepturi_utilizatori;
