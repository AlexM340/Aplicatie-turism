const { Camere } = require("../models/camere");
const { Cazare } = require("../models/cazare");
const { Pachete } = require("../models/pachete"); // Aici a fost un "0" la sfârșit care nu este necesar
const { Zboruri } = require("../models/zboruri");
const sequelize = require("../database");

// Funcție pentru obținerea camerelor
/**
 * @description Obtine Camerele din baza de date
 * @param {*} req
 * @param {*} res
 */
const getCamere = async (req, res) => {
  try {
    const camere = await Camere.findAll(); // Obține toate camerele din baza de date
    res.status(200).json(camere); // Returnează datele pentru camere
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch camere" }); // Mesaj de eroare dacă ceva nu merge
  }
};

// Funcție pentru obținerea cazării

/**
 * @description Obtine cazarea din baza de date
 * @param {*} req
 * @param {*} res
 */
const getCazare = async (req, res) => {
  try {
    const cazare = await Cazare.findAll(); // Obține toate cazările din baza de date
    res.status(200).json(cazare); // Returnează datele pentru cazare
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch cazare" }); // Mesaj de eroare dacă ceva nu merge
  }
};

// Funcție pentru obținerea pachetelor

/**
 * @description Obtine id-ul,pretul si descrierea pachetului
 * @param {*} req
 * @param {*} res
 */
const getPachete = async (req, res) => {
  try {
    //   const pachete = await Pachete.findAll();
    const pachete = await sequelize.query(
      "select p.id, c.pret, c.descriere from pachete p left join camere c on p.id_camera=c.id left join zboruri z on z.id = p.id_zbor "
    );

    console.log(pachete); // Log the results to ensure data is being fetched
    res.status(200).json(pachete);
  } catch (err) {
    console.error("Error fetching pachete:", err); // Log errors if they occur
    res.status(500).json({ err: "Failed to fetch pachete" });
  }
};

// Funcție pentru obținerea zborurilor
/**
 * @description Obtine zborurile din baza de date
 * @param {*} req
 * @param {*} res
 */
const getZboruri = async (req, res) => {
  try {
    const zboruri = await Zboruri.findAll(); // Obține toate zborurile din baza de date
    res.status(200).json(zboruri); // Returnează datele pentru zboruri
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch zboruri" }); // Mesaj de eroare dacă ceva nu merge
  }
};

module.exports = {
  getCamere,
  getCazare,
  getPachete,
  getZboruri,
};
