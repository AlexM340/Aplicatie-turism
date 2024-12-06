'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creare tabele
    await queryInterface.createTable('camere', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_cazare: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cazare',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      nr_persoane: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      descriere: {
        type: Sequelize.STRING(600),
        allowNull: false,
      },
      pret: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.createTable('angajati', {
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
    });

    await queryInterface.createTable('cazare', {
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
          model: 'tari',
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
      },
    });
    await queryInterface.createTable('clienti', {
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
      data_creare: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      email: {
        type: Sequelize.STRING(200),
        unique: true,
        allowNull: true,
      },
    });

    await queryInterface.createTable('clienti_detalii', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clienti',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      telefon: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      adresa: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      cnp: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    });
    await queryInterface.createTable('drepturi_utilizatori', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_angajat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'angajati',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_permisiune: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'permisiuni',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.createTable('localitati', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      denumire: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      id_tara: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tari',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      imagine: {
        type: Sequelize.STRING(200),
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
      data_plecare: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_sosire: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('permisiuni', {
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
      },
    });

    await queryInterface.createTable('rezervari', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pachet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pachete',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      id_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clienti',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.createTable('tari', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      denumire: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    });

    await queryInterface.createTable('tranzactii', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_rezervare: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rezervari',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      suma: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      achitat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data_tranzactie: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('zboruri', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      aeroport_plecare: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      aeroport_sosire: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      id_loc_plecare: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'localitati',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      id_tara_plecare: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tari',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      id_loc_sosire: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'localitati',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      id_tara_sosire: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tari',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      data_plecare: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_sosire: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      companie: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      pret: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      clasa: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    });

  },

  async down(queryInterface, Sequelize) {
    // Ștergerea tabelelor în ordinea inversă față de crearea lor
    await queryInterface.dropTable('camere');
    await queryInterface.dropTable('angajati');
    await queryInterface.dropTable('cazare');
    await queryInterface.dropTable('clienti');
    await queryInterface.dropTable('clienti_detalii');
    await queryInterface.dropTable('drepturi_utilizatori');
    await queryInterface.dropTable('localitati');
    await queryInterface.dropTable('pachete');
    await queryInterface.dropTable('permisiuni');
    await queryInterface.dropTable('rezervari');
    await queryInterface.dropTable('tari');
    await queryInterface.dropTable('tranzactii');
    await queryInterface.dropTable('zboruri');

  }
};
