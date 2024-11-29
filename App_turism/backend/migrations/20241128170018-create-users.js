'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creare tabele
    await queryInterface.createTable('zboruri', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      aeroport_plecare: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      aeroport_sosire: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      data_plecare: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_sosire: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pret: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      companie: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      clasa: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });

    await queryInterface.createTable('cazare', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nume: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      telefon: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      descriere: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      adresa: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });

    await queryInterface.createTable('camere', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_hotel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cazare',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nr_persoane: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      descriere: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      pret: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.createTable('pachete', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_camera: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'camere',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_zbor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'zboruri',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      data_sosire: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_plecare: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert('zboruri', [{
      aeroport_plecare: 'Henri',
      aeroport_sosire: 'Barcelona',
      data_plecare: '2024-06-15',
      data_sosire: '2024-06-15',
      pret: 200,
      companie: 'Blue Air',
      clasa: 'Economy',
    }]);

    await queryInterface.bulkInsert('cazare', [{
      nume: 'Hotel Luna',
      telefon: '0123-456-789',
      descriere: 'Hotel de 3 stele, aproape de plajă',
      adresa: 'Strada Plajei, nr.1',
    }]);

    await queryInterface.bulkInsert('camere', [{
      id_hotel: 1, 
      nr_persoane: 2,
      descriere: 'Cameră dublă cu vedere la mare',
      pret: 150,
    }]);

    await queryInterface.bulkInsert('pachete', [{
      id_camera: 1, 
      id_zbor: 1,   
      data_sosire: '2024-06-16',
      data_plecare: '2024-06-20',
    }]);
  },

  async down(queryInterface, Sequelize) {
    // Ștergerea tabelelor în ordinea inversă față de crearea lor
    await queryInterface.dropTable('pachete');
    await queryInterface.dropTable('camere');
    await queryInterface.dropTable('cazare');
    await queryInterface.dropTable('zboruri');
  }
};
