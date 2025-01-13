const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../database'); 


const Cazare = sequelize.define('Cazare', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nume: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  telefon: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
  descriere: {
    type: Sequelize.STRING(600),
    allowNull: false,
  },
  id_tara: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Tari',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_loc: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'localitati',
      key: 'id',
    },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'cazare',  
});
Cazare.associate = (models) => {
  Cazare.belongsTo(models.Tari, { 
    foreignKey: "id_tara", 
    as: "cazari" 
  });

  Cazare.belongsTo(models.Localitati, { 
    foreignKey: "id_loc", 
    as: "localitate" 
  });

  Cazare.hasMany(models.Camere, { 
    foreignKey: "id_cazare", 
    as: "camere" 
  });
};



module.exports = Cazare;
