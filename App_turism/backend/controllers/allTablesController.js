const { Tari, Cazare, Camere, Pachete, Zboruri } = require("../models");
const { Op, Sequelize, where } = require("sequelize");
const Localitati = require("../models/localitati");
const moment = require("moment");

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
    const pachete = await Pachete.findAll({
      include: [
        {
          model: Camere,
          as: "camera",
          attributes: ["pret", "descriere", "nr_persoane"], // Select specific fields from the "camere" table
          include: [
            {
              model: Cazare,
              as: "cazare",
              attributes: ["nume", "telefon", "descriere"], // Fields from the "cazare" table
              include: [
                {
                  model: Localitati,
                  as: "localitate",
                  attributes: ["denumire"], // Field from the "localitati" table
                },
              ],
            },
          ],
        },
        {
          model: Zboruri,
          as: "zbor",
          attributes: [
            "aeroport_plecare",
            "aeroport_sosire",
            "data_plecare",
            "data_sosire",
            "companie",
            "clasa",
            "pret",
          ], // Fields from the "zboruri" table
        },
      ],
    });
    const pacheteCuPret = pachete.map((pachet) => {
      const dataSosire = moment(pachet.data_checkin);
      const dataPlecare = moment(pachet.data_checkout);
      const zileStare = dataPlecare.diff(dataSosire, "days"); // Număr de zile între sosire și plecare
      console.log(pachet?.camera?.pret);
      const pretCameraTotal = zileStare * (pachet?.camera?.pret || 0); // Prețul total al camerei
      const pretTotal = pretCameraTotal + (pachet?.zbor?.pret || 0); // Adăugăm prețul zborului
      console.log(pretCameraTotal);

      return {
        ...pachet.toJSON(), // Conversia obiectului Sequelize
        pret: pretTotal, // Adăugăm prețul total
      };
    });

    res.status(200).json(pacheteCuPret);
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
    const zboruri = await Zboruri.findAll({
      include: [
        {
          model: Localitati,
          as: "localitatePlecare",
          attributes: ["denumire"],
        },
        {
          model: Localitati,
          as: "localitateSosire",
          attributes: ["denumire"],
        },
      ]
    }); // Obține toate zborurile din baza de date
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
    res.set("Content-Type", "application/json");
    res.status(200).json(tari);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to fetch tari" }); // Mesaj de eroare dacă ceva nu merge
  }
};
const getOrase = async (req, res) => {
  try {
    const dataCurenta = new Date();

    // Interogare pentru a aduce tarile care au cazari și camere disponibile în pachete active
    const orase = await Localitati.findAll();
    res.set("Content-Type", "application/json");
    res.status(200).json(orase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to fetch tari" }); // Mesaj de eroare dacă ceva nu merge
  }
};
const getAeropoarte = async (req, res) => {
  try {
    const aeropoarte = await Zboruri.findAll({
      include: [
        {
          model: Localitati,
          as: "localitatePlecare",
          attributes: ["denumire"],
        },
      ],
    });
    res.set("Content-Type", "application/json");
    res.status(200).json(aeropoarte);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to fetch tari" }); // Mesaj de eroare dacă ceva nu merge
  }
};
const cautarePachete = async (req, res) => {
  try {
    console.log("AICIIIIII");
    const { destination, departureCity, date, numPersons, tara, tip } =
      req.body;

    // Extract idDestination from destination.id
    const idDestination = destination?.id || null; // Use null or a default value if destination is undefined
    const idDepartureCity = departureCity?.id || null; // Use null or a default value if destination is undefined

    // console.log(req);
    if (!date || !numPersons) {
      return res
        .status(400)
        .json({ error: "Parametrii 'date' și 'numPersons' sunt obligatorii!" });
    }

    const includeFilters = [];
    if (tip !== "cazare") {
      includeFilters.push({
        model: Zboruri,
        as: "zbor",
        attributes: ["pret", "data_plecare"], // Prețul zborului și data plecării
        // where: {
        //   data_plecare: {
        //     [Op.eq]: date, // Include doar zboruri cu data plecării egală cu cea specificată
        //   },
        // },
      });
    }
    console.log(includeFilters);
    // if (idDepartureCity) {
    //   includeFilters.push({
    //     model: Localitati,
    //     as: "localitatePlecare",
    //     attributes: ["denumire"],
    //     where: { denumire: idDepartureCity },
    //   });
    // } else {
    //   includeFilters.push({
    //     model: Localitati,
    //     as: "localitatePlecare",
    //     attributes: ["denumire"],
    //   });
    // }

    // if (idDestination) {
    //   includeFilters.push({
    //     model: Cazare,
    //     as: "cazare",
    //     include: [
    //       {
    //         model: Localitati,
    //         as: "localitateDestinatie",
    //         attributes: ["denumire"],
    //         where: { denumire: idDestination },
    //       },
    //     ],
    //   });
    // } else {
    //   includeFilters.push({
    //     model: Cazare,
    //     as: "cazare",
    //     include: [
    //       {
    //         model: Localitati,
    //         as: "localitateDestinatie",
    //         attributes: ["denumire"],
    //       },
    //     ],
    //   });
    // }

    const pachete = await Pachete.findAll({
      include: [
        ...includeFilters,
        {
          model: Camere,
          as: "camera",
          attributes: ["nr_persoane", "pret"], // Prețul camerei pe noapte
          include: [
            {
              model: Cazare,
              as: "cazare",
              include: [
                {
                  model: Localitati,
                  as: "localitate",
                  attributes: ["denumire"],
                  where: {
                    ...(idDestination && { id: idDestination }),
                  },
                  include: [
                    {
                      model: Tari,
                      as: "tara",
                      attributes: ["denumire"],
                      where: {
                        ...(tara && { denumire: tara }),
                      },
                    },
                  ],
                  required: true,
                },
              ],
              required: true,
            },
          ],
          where: {
            nr_persoane: {
              [Op.gte]: numPersons,
            },
          },
          required: true,
        },
        // tip !== "cazare"
        //   ? {
        //       model: Zboruri,
        //       as: "zbor",
        //       attributes: ["pret", "data_plecare"], // Prețul zborului și data plecării
        //       // where: {
        //       //   data_plecare: {
        //       //     [Op.eq]: date,
        //       //   },
        //       // },
        //     }
        //   : {},
      ],
      where: {
        id_zbor:
          tip === "cazare"
            ? {
                [Op.eq]: null,
              }
            : { [Op.ne]: null },
      },
    });
    console.log(pachete);

    // Calculăm prețul total pentru fiecare pachet
    const pacheteCuPret = pachete.map((pachet) => {
      const dataSosire = moment(pachet.data_checkin);
      const dataPlecare = moment(pachet.data_checkout);
      const zileStare = dataPlecare.diff(dataSosire, "days"); // Număr de zile între sosire și plecare
      console.log(pachet?.camera?.pret);
      const pretCameraTotal = zileStare * (pachet?.camera?.pret || 0); // Prețul total al camerei
      const pretTotal = pretCameraTotal + (pachet?.zbor?.pret || 0); // Adăugăm prețul zborului
      console.log(pretCameraTotal);

      return {
        ...pachet.toJSON(), // Conversia obiectului Sequelize
        pret: pretTotal, // Adăugăm prețul total
      };
    });

    res.set("Content-Type", "application/json");
    res.status(200).json(pacheteCuPret);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to fetch packages" });
  }
};

module.exports = {
  getCamere,
  getCazare,
  getPachete,
  getZboruri,
  getTari,
  getOrase,
  getAeropoarte,
  cautarePachete,
};
