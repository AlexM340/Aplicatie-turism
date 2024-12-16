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

    queryInterface.bulkInsert("angajati", [
      {
        id:1,
        username: "admin",
        nume: "Administrator",
        parola: "T%r4E#w2",
        admin: 1,
        data_creare: Date().now(),
        email: "adrianmascovici@yahoo.com",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:2,
        username: "angajat",
        nume: "Angajat",
        parola: "T%r4E#w2",
        admin: 0,
        data_creare: Date().now(),
        email: "angajat@yahoo.com",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
    ]);
    queryInterface.bulkInsert("permisiuni", [
      {
        id:1,
        denumire: "Creeaza pachete",
        valoare: "1",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:2,
        denumire: "Modifica pachete",
        valoare: "1",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
    ]);
    queryInterface.bulkInsert("drepturi_utilizatori", [
      {
        id:1,
        id_angajat: 2,
        id_permisiune:2,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
    ]);
    queryInterface.bulkInsert("clienti", [
      {
        id:1,
        username: "alex",
        nume: "Alex Mascovici",
        parola:"1234",
        data_creare:Date().now(),
        email:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:1,
        username: "Danut",
        nume: "Danut Pop",
        parola:"1234",
        data_creare:Date().now(),
        email:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
    ]);
    queryInterface.bulkInsert("clienti_detalii", [
      {
        id:1,
        id_client:1,
        telefon: "07",
        adresa: "victoriei",
        cnp:"12",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:2,
        id_client:2,
        telefon: "07",
        adresa: "victoriei",
        cnp:"12",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
    ]);
    queryInterface.bulkInsert("tari", [
      {
        id:1,
        denumire:"Romania",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:2,
        denumire:"Grecia",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:3,
        denumire:"Spania",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:4,
        denumire:"Islanda",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:5,
        denumire:"Finlanda",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:6,
        denumire:"Bulgaria",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:7,
        denumire:"Italia",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:8,
        denumire:"Croatia",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:9,
        denumire:"Ungaria",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:10,
        denumire:"Egipt",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:11,
        denumire:"Turcia",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
    ]);
    queryInterface.bulkInsert("localitati", [
      {
        id:1,
        denumire:"Constanta",
        id_tara:1,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:2,
        denumire:"Bucuresti",
        id_tara:1,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:3,
        denumire:"Mangalia",
        id_tara:1,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:4,
        denumire:"Baia Mare",
        id_tara:1,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:5,
        denumire:"Atena",
        id_tara:2,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:6,
        denumire:"Corint",
        id_tara:2,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:7,
        denumire:"Roma",
        id_tara:7,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:8,
        denumire:"Pisa",
        id_tara:7,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:9,
        denumire:"Venetia",
        id_tara:7,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:10,
        denumire:"Florenta",
        id_tara:7,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:11,
        denumire:"Antalya",
        id_tara:11,
        imagine:"",
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
    ]);
    queryInterface.bulkInsert("cazare", [
      {
        id:1,
        nume:"Hotel Elena",
        telefon:"0742",
        descriere:"Tare fain",
        id_tara:1,
        id_loc:1,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:2,
        nume:"Hotel Diafan",
        telefon:"0742",
        descriere:"Tare fain",
        id_tara:1,
        id_loc:4,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:3,
        nume:"Pensiunea 3 pini",
        telefon:"0742",
        descriere:"Tare fain",
        id_tara:1,
        id_loc:2,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:4,
        nume:"Hotel Continental",
        telefon:"0742",
        descriere:"Lux",
        id_tara:2,
        id_loc:5,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:5,
        nume:"Hotel Caesar",
        telefon:"0742",
        descriere:"Italiano bello",
        id_tara:7,
        id_loc:7,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      
    ]);
    queryInterface.bulkInsert("camere", [
      {
        id:1,
        id_cazare:1,
        nr_persoane:2,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:2,
        id_cazare:1,
        nr_persoane:2,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:3,
        id_cazare:1,
        nr_persoane:4,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:4,
        id_cazare:4,
        nr_persoane:2,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:5,
        id_cazare:4,
        nr_persoane:3,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:6,
        id_cazare:4,
        nr_persoane:4,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:7,
        id_cazare:5,
        nr_persoane:2,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:8,
        id_cazare:4,
        nr_persoane:2,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:9,
        id_cazare:4,
        nr_persoane:2,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:10,
        id_cazare:2,
        nr_persoane:2,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:11,
        id_cazare:2,
        nr_persoane:3,
        descriere:"Camera spatioasa",
        pret:200,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
    ]);
    queryInterface.bulkInsert("zboruri", [
      {
        id:1,
        nume:"Hotel Elena",
        telefon:"0742",
        descriere:"Tare fain",
        id_tara:1,
        id_loc:1,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:2,
        nume:"Hotel Diafan",
        telefon:"0742",
        descriere:"Tare fain",
        id_tara:1,
        id_loc:4,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:3,
        nume:"Pensiunea 3 pini",
        telefon:"0742",
        descriere:"Tare fain",
        id_tara:1,
        id_loc:2,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:4,
        nume:"Hotel Continental",
        telefon:"0742",
        descriere:"Lux",
        id_tara:2,
        id_loc:5,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      {
        id:5,
        nume:"Hotel Caesar",
        telefon:"0742",
        descriere:"Italiano bello",
        id_tara:7,
        id_loc:7,
        createdAt: Date().now(),
        modifiedAt: Date().now(),
      },
      
    ]);
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
