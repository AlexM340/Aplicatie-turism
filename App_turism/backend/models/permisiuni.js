const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../database'); 

const Permisiuni = sequelize.define('Permisiuni', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      denumire: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      valoare: {
        type: Sequelize.STRING(200),
        allowNull: false,
      }
}, {
  tableName: 'permisiuni', 
});
Permisiuni.associate = (models) => {
  Permisiuni.hasMany(models.Drepturi_utilizatori, {
    foreignKey: "id_permisiune",
    as: "drepturi",
  });
};

module.exports = Permisiuni;
