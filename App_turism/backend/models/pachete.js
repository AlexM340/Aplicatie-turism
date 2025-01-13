const { Sequelize, DataTypes } = require("sequelize");
const {sequelize} = require("../database");
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
        model:Camere,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_zbor: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Zboruri,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_angajat: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "angajati",
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
    tableName: "pachete",
  }
);

Pachete.associate = (models) => {
  Pachete.hasMany(models.Rezervari, {
    foreignKey: "id_pachet",
    as: "rezervari",
  });
  Pachete.belongsTo(models.Camere, {
    foreignKey: "id_camera",
    as: "camera",
  });

  Pachete.belongsTo(models.Zboruri, {
    foreignKey: "id_zbor",
    as: "zbor",
  });
  Pachete.belongsTo(models.Angajati, { foreignKey: 'id_angajat', as: 'angajat' });
};

module.exports = Pachete;
