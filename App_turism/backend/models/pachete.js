const { Sequelize, DataTypes } = require("sequelize");
const {sequelize} = require("../database"); // Importă conexiunea
const Camere = require("./camere");
const Zboruri = require("./zboruri");
const Pachete = sequelize.define(
  "Pachete",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_camera: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model:Camere, // Numele modelului la care se face referința
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_zbor: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Zboruri, // Numele modelului la care se face referința
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_angajat: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "angajati", // Numele modelului la care se face referința
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    data_checkin: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    data_checkout: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdAt:{
      type: Sequelize.DATE,
      allowNull:true,
    },
    updatedAt:{
      type: Sequelize.DATE,
      allowNull:true,
    }
  },
  {
    tableName: "pachete", // Asigură-te că numele tabelei este corect
  }
);

Pachete.associate = (models) => {
  // Un pachet poate avea mai multe rezervări
  Pachete.hasMany(models.Rezervari, {
    foreignKey: "id_pachet",
    as: "rezervari",
  });
  Pachete.belongsTo(models.Camere, {
    foreignKey: "id_camera",
    as: "camera",
  });

  // Un pachet are un zbor asociat
  Pachete.belongsTo(models.Zboruri, {
    foreignKey: "id_zbor",
    as: "zbor",
  });
  Pachete.belongsTo(models.Angajati, { foreignKey: 'id_angajat', as: 'angajat' });
};

module.exports = Pachete;
