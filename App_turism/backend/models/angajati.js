const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database"); // Importă conexiunea

const Angajati = sequelize.define(
  "angajati",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    nume: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    parola: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    data_creare: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    email: {
      type: Sequelize.STRING(200),
      unique: true,
      allowNull: true,
    },
  },
  {
    tableName: "angajati", // Specifică numele corect al tabelei
  }
);

// Testam sincronizarea
Angajati.sync()
  .then
  // () => console.log('Tabelul angajati a fost sincronizat cu succes.')
  ()
  .catch((error) =>
    console.error("Eroare la sincronizarea tabelului angajati:", error)
  );

module.exports = Angajati;
