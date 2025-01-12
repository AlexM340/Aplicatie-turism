const { Tari, Cazare, Camere, Pachete, Zboruri } = require("../models");
const { Op, Sequelize, where } = require("sequelize");
const Localitati = require("../models/localitati");
const moment = require("moment");
const { group } = require("console");

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
      ],
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
      attributes: [
        [Sequelize.col("localitatePlecare.denumire"), "denumire"], // Selectăm doar denumirea localității
        "id_loc_plecare", // Adăugăm acest atribut pentru grupare
      ],
      include: [
        {
          model: Localitati,
          as: "localitatePlecare",
          attributes: ["denumire"],
        },
      ],
      group: ["id_loc_plecare"],
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

const addPachet = async (req, res) => {
  try {
    const { cazare, zbor, data_checkin, data_checkout } = req.body;

    const idCazare = cazare.id || 0;
    const idZbor = zbor.id || 0;
    const formattedCheckin = new Date(data_checkin);
    formattedCheckin.setHours(15, 0, 0, 0); // Setează ora la 15:00:00

    // Adaugă ora 10:00:00 la data_checkout
    const formattedCheckout = new Date(data_checkout);
    formattedCheckout.setHours(10, 0, 0, 0); // Setează ora la 10:00:00

    // Creează pachetul

    // Validăm datele necesare
    if (!idCazare || !data_checkin || !data_checkout) {
      return res.status(400).json({ err: "Missing required fields" });
    }

    // Verificăm dacă data_checkin este înainte de data_checkout
    if (new Date(data_checkin) >= new Date(data_checkout)) {
      return res
        .status(400)
        .json({ err: "Check-in date must be before check-out date" });
    }

    // Găsim o cameră liberă în cazarea specificată
    const availableCamera = await Camere.findOne({
      where: {
        id_cazare: idCazare,
      },
      include: [
        {
          model: Pachete,
          as: "pachete",
          required: false,
          where: {
            // Verificăm dacă există suprapuneri în perioada specificată
            [Op.or]: [
              {
                data_checkin: {
                  [Op.between]: [data_checkin, data_checkout],
                },
              },
              {
                data_checkout: {
                  [Op.between]: [data_checkin, data_checkout],
                },
              },
              {
                [Op.and]: [
                  {
                    data_checkin: {
                      [Op.lte]: data_checkin,
                    },
                  },
                  {
                    data_checkout: {
                      [Op.gte]: data_checkout,
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    });

    if (!availableCamera) {
      return res
        .status(404)
        .json({ err: "No available camera for the given period" });
    }

    // Creăm pachetul pentru camera găsită
    const newPachet = await Pachete.create({
      id_camera: availableCamera.id,
      id_zbor: idZbor || null,
      data_checkin: formattedCheckin,
      data_checkout: formattedCheckout,
    });

    // Returnăm pachetul creat
    res.status(201).json(newPachet);
  } catch (error) {
    console.error("Error adding pachet:", error);
    res.status(500).json({ err: "Failed to add pachet" });
  }
};
const addZbor = async (req, res) => {
  try {
    // Extrage datele din request body
    const {
      localitatePlecare,
      localitateSosire,
      id_tara_plecare,
      id_tara_sosire,
      data_plecare,
      data_sosire,
      clasa,
      companie,
      pret,
    } = req.body;
    const idPlecare = localitatePlecare.id || 0;
    const idSosire = localitateSosire.id || 0;

    // Verifică dacă toate câmpurile necesare sunt prezente
    if (!idPlecare || !idSosire || !data_plecare || !data_sosire || !pret) {
      return res
        .status(400)
        .json({ error: "Toate câmpurile sunt obligatorii!" });
    }

    // Creează un nou zbor în baza de date
    const nouZbor = await Zboruri.create({
      id_loc_plecare: idPlecare,
      id_loc_sosire: idSosire,
      id_tara_plecare: id_tara_plecare,
      id_tara_sosire: id_tara_sosire,
      data_plecare: data_plecare,
      data_sosire: data_sosire,
      pret: pret,
      clasa: clasa,
      companie: companie,
    });

    // Returnează un răspuns cu zborul creat
    res.status(201).json({ message: "Zbor adăugat cu succes!", zbor: nouZbor });
  } catch (error) {
    console.error("Eroare la adăugarea zborului:", error);
    res.status(500).json({ error: "A apărut o eroare la adăugarea zborului." });
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
  addPachet,
  addZbor,
};
