const { Tari, Cazare, Camere, Pachete, Zboruri } = require("../models");
const { Op, Sequelize } = require("sequelize");

// Funcție pentru obținerea camerelor
/**
 * Obtine Camerele din baza de date.
 *
 * Această funcție folosește modelul `Camere` pentru a extrage toate
 * înregistrările din baza de date și le returnează într-un răspuns JSON.
 *
 * @param {Object} req - Obiectul de cerere HTTP.
 * @param {Object} res - Obiectul de răspuns HTTP.
 * @returns {void} Returnează un răspuns JSON cu lista camerelor sau un mesaj de eroare.
 */
const getCamere = async (req, res) => {
  try {
    const camere = await Camere.findAll(); // Obține toate camerele din baza de date
    res.status(200).json(camere); // Returnează datele pentru camere
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch camere" }); // Mesaj de eroare dacă ceva nu merge
  }
};

/**
 * Obține lista cazărilor din baza de date.
 *
 * Această funcție utilizează modelul `Cazare` pentru a extrage toate înregistrările
 * din tabelul asociat și returnează datele sub formă de răspuns JSON
 *
 * @param {Object} req - Obiectul cererii HTTP
 * @param {Object} res - Obiectul răspunsului HTTP
 * @returns {void} Răspunsul conține fie lista cazărilor, fie un mesaj de eroare
 */

const getCazare = async (req, res) => {
  try {
    const cazare = await Cazare.findAll(); // Obține toate cazările din baza de date
    res.status(200).json(cazare); // Returnează datele pentru cazare
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch cazare" }); // Mesaj de eroare dacă ceva nu merge
  }
};

/**
 * Obține ID-ul, prețul și descrierea fiecărui pachet
 *
 * Această funcție execută o interogare SQL pentru a extrage date despre pachete
 * din tabelele pachete, camere și zboruri, facand join intre tabele
 *
 * @param {Object} req - Obiectul cererii HTTP
 * @param {Object} res - Obiectul răspunsului HTTP
 * @returns {void} Răspunsul conține fie lista de pachete, fie un mesaj de eroare
 */

const getPachete = async (req, res) => {
  try {
    const pachete = await Pachete.findAll();

    // const pachete = await sequelize.query(
    //   "select p.id, c.pret, c.descriere from pachete p left join camere c on p.id_camera=c.id left join zboruri z on z.id = p.id_zbor "
    // );

    // console.log(pachete); // Log the results to ensure data is being fetched
    res.status(200).json(pachete);
  } catch (err) {
    console.error("Error fetching pachete:", err); // Log errors if they occur
    res.status(500).json({ err: "Failed to fetch pachete" });
  }
};

/**
 * Obține lista zborurilor din baza de date
 *
 * Această funcție utilizează modelul Zboruri pentru a extrage toate înregistrările
 * din tabelul asociat și returnează datele sub formă de răspuns JSON.
 *
 * @param {Object} req - Obiectul cererii HTTP
 * @param {Object} res - Obiectul răspunsului HTTP
 * @returns {void} Răspunsul conține fie lista de zboruri, fie un mesaj de eroare
 */

const getZboruri = async (req, res) => {
  try {
    const zboruri = await Zboruri.findAll(); // Obține toate zborurile din baza de date
    res.status(200).json(zboruri); // Returnează datele pentru zboruri
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch zboruri" }); // Mesaj de eroare dacă ceva nu merge
  }
};
const getTari = async (req, res) => {
  try {
    const dataCurenta = new Date();

    // Interogare pentru a aduce tarile care au cazari și camere disponibile în pachete active
    const tari = await Tari.findAll({
      include: [
        {
          model: Cazare,
          as: "cazari",
          attributes: [],
          include: [
            {
              model: Camere,
              attributes: [],
              as: "camere",
              // Filtrăm camerele care fac parte din pachete active
              include: [
                {
                  model: Pachete,
                  as: "pachete",
                  attributes: [],
                  // where: {
                  //   data_sosire: { [Op.lte]: dataCurenta },  // Data sosire înainte de data curentă
                  //   data_plecare: { [Op.gte]: dataCurenta }, // Data plecare după data curentă
                  // },
                  required: true, // Asigurăm că doar cazările cu camere în pachete active vor fi returnate
                },
              ],
              required: true, // Asigură că sunt incluse doar camerele care au pachete active
            },
          ],
          required: true,
        },
      ],
      attributes: [
        "id",
        "denumire",
        [Sequelize.fn("min", Sequelize.col("cazari.camere.pret")), "pret"], // Adaugă prețul minim
      ],
      group: ["Tari.id", "Tari.denumire"],
    });
    res.status(200).json(tari);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to fetch tari" }); // Mesaj de eroare dacă ceva nu merge
  }
};

module.exports = {
  getCamere,
  getCazare,
  getPachete,
  getZboruri,
  getTari,
};
