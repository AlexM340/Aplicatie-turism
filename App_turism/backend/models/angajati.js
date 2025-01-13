const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database"); 

const Angajati = sequelize.define(
  "Angajati",
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
    tableName: "angajati", 
  }
);
Angajati.associate = (models) => {
  Angajati.hasMany(models.Drepturi_utilizatori, {
    foreignKey: "id_angajat",
    as: "drepturi",
  });
  Angajati.hasMany(models.Pachete, { foreignKey: "id_angajat", as: "pachete" });
};

module.exports = Angajati;
