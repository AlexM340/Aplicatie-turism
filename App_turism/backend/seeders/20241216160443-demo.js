"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    *
    * Example:
    * await queryInterface.bulkInsert('People', [{
    *   name: 'John Doe',
    *   isBetaMember: false
    * }], {});
    */
   try {
      const bcrypt = require('bcrypt')
      await queryInterface.bulkInsert("angajati", [
        {
          id: 1,
          username: "admin",
          nume: "Administrator",
          parola: await bcrypt.hash("T%r4E#w2", 10),
          admin: 1,
          data_creare: new Date().toISOString().slice(0, 19).replace("T", " "),
          email: "adrianmascovici@yahoo.com",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          username: "angajat",
          nume: "Angajat",
          parola: await bcrypt.hash("T%r4E#w2", 10),
          admin: 0,
          data_creare: new Date().toISOString().slice(0, 19).replace("T", " "),
          email: "angajat@yahoo.com",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("permisiuni", [
        {
          id: 1,
          denumire: "Creeaza pachete",
          valoare: "1",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          denumire: "Modifica pachete",
          valoare: "1",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("drepturi_utilizatori", [
        {
          id: 1,
          id_angajat: 2,
          id_permisiune: 2,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("clienti", [
        {
          id: 1,
          username: "alex",
          nume: "Alex Mascovici",
          parola:await bcrypt.hash("1234", 10),
          data_creare: new Date().toISOString().slice(0, 19).replace("T", " "),
          email: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          username: "Danut",
          nume: "Danut Pop",
          parola: await bcrypt.hash("1234", 10),
          data_creare: new Date().toISOString().slice(0, 19).replace("T", " "),
          email: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("clienti_detalii", [
        {
          id: 1,
          id_client: 1,
          telefon: "07",
          adresa: "victoriei",
          cnp: "12",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          id_client: 2,
          telefon: "07",
          adresa: "victoriei",
          cnp: "12",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("tari", [
        {
          id: 1,
          denumire: "Romania",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          denumire: "Grecia",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 3,
          denumire: "Spania",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 4,
          denumire: "Islanda",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 5,
          denumire: "Finlanda",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 6,
          denumire: "Bulgaria",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 7,
          denumire: "Italia",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 8,
          denumire: "Croatia",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 9,
          denumire: "Ungaria",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 10,
          denumire: "Egipt",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 11,
          denumire: "Turcia",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("localitati", [
        {
          id: 1,
          denumire: "Constanta",
          id_tara: 1,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          denumire: "Bucuresti",
          id_tara: 1,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 3,
          denumire: "Mangalia",
          id_tara: 1,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 4,
          denumire: "Baia Mare",
          id_tara: 1,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 5,
          denumire: "Atena",
          id_tara: 2,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 6,
          denumire: "Corint",
          id_tara: 2,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 7,
          denumire: "Roma",
          id_tara: 7,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 8,
          denumire: "Pisa",
          id_tara: 7,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 9,
          denumire: "Venetia",
          id_tara: 7,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 10,
          denumire: "Florenta",
          id_tara: 7,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 11,
          denumire: "Antalya",
          id_tara: 11,
          imagine: "",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("cazare", [
        {
          id: 1,
          nume: "Hotel Elena",
          telefon: "0742",
          descriere: "Tare fain",
          id_tara: 1,
          id_loc: 1,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          nume: "Hotel Diafan",
          telefon: "0742",
          descriere: "Tare fain",
          id_tara: 1,
          id_loc: 4,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 3,
          nume: "Pensiunea 3 pini",
          telefon: "0742",
          descriere: "Tare fain",
          id_tara: 1,
          id_loc: 2,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 4,
          nume: "Hotel Continental",
          telefon: "0742",
          descriere: "Lux",
          id_tara: 2,
          id_loc: 5,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 5,
          nume: "Hotel Caesar",
          telefon: "0742",
          descriere: "Italiano bello",
          id_tara: 7,
          id_loc: 7,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("camere", [
        {
          id: 1,
          id_cazare: 1,
          nr_persoane: 2,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          id_cazare: 1,
          nr_persoane: 2,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 3,
          id_cazare: 1,
          nr_persoane: 4,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 4,
          id_cazare: 4,
          nr_persoane: 2,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 5,
          id_cazare: 4,
          nr_persoane: 3,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 6,
          id_cazare: 4,
          nr_persoane: 4,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 7,
          id_cazare: 5,
          nr_persoane: 2,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 8,
          id_cazare: 4,
          nr_persoane: 2,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 9,
          id_cazare: 4,
          nr_persoane: 2,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 10,
          id_cazare: 2,
          nr_persoane: 2,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 11,
          id_cazare: 2,
          nr_persoane: 3,
          descriere: "Camera spatioasa",
          pret: 200,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("zboruri", [
        {
          id: 1,
          aeroport_plecare: "aeroport tauti",
          aeroport_sosire: "aeroport roma",
          id_loc_plecare: 4,
          id_tara_plecare: 1,
          id_loc_sosire: 7,
          id_tara_sosire: 7,
          data_plecare: "2024-12-23 17:00:00.000",
          data_sosire: "2024-12-23 20:00:00.000",
          companie: "WizzAir",
          pret: 133,
          clasa: "Business",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
      await queryInterface.bulkInsert("pachete", [
        {
          id: 1,
          id_camera: 7,
          id_zbor: 1,
          id_angajat: 1,
          data_checkin: "2024-12-24 14:00:00.000",
          data_checkout: "2025-01-03 10:00:00.000",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          id_camera: 3,
          id_zbor: null,
          id_angajat: 1,
          data_checkin: "2024-12-24 14:00:00.000",
          data_checkout: "2025-01-03 10:00:00.000",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 3,
          id_camera: 5,
          id_zbor: null,
          id_angajat: 1,
          data_checkin: "2024-12-24 14:00:00.000",
          data_checkout: "2025-01-03 10:00:00.000",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
