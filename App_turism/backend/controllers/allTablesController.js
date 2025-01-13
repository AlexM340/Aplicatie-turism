const { Tari, Cazare, Camere, Pachete, Zboruri } = require("../models");
const { Op, Sequelize, where } = require("sequelize");
const Localitati = require("../models/localitati");
const moment = require("moment");
const Clienti = require("../models/clienti");
const Clienti_detalii = require("../models/clienti_detalii");

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
    const camere = await Camere.findAll();
    res.status(200).json(camere);
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch camere" });
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
    const cazare = await Cazare.findAll(); 
    res.status(200).json(cazare);
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch cazare" });
  }
};
const getCazareAngajat = async (req, res) => {
  try {
    const cazare = await Cazare.findAll({
      include: [
        {
          model: Localitati,
          as: "localitate",
          attributes: ["denumire"],
        },
      ],
    });
    res.status(200).json(cazare);
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch cazare" });
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
          attributes: ["pret", "descriere", "nr_persoane"],
          include: [
            {
              model: Cazare,
              as: "cazare",
              attributes: ["nume", "telefon", "descriere"],
              include: [
                {
                  model: Localitati,
                  as: "localitate",
                  attributes: ["denumire"], 
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
          ],
        },
      ],
    });
    const pacheteCuPret = pachete.map((pachet) => {
      const dataSosire = moment(pachet.data_checkin);
      const dataPlecare = moment(pachet.data_checkout);
      const zileStare = dataPlecare.diff(dataSosire, "days") + 1;
      const pretCameraTotal = zileStare * (pachet?.camera?.pret || 0);
      const pretTotal = pretCameraTotal + (pachet?.zbor?.pret || 0);

      return {
        ...pachet.toJSON(),
        pret: pretTotal,
      };
    });

    res.status(200).json(pacheteCuPret);
  } catch (err) {
    console.error("Error fetching pachete:", err);
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
    }); 
    res.status(200).json(zboruri);
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch zboruri" }); 
  }
};
const getTari = async (req, res) => {
  try {
    const dataCurenta = new Date();

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
              include: [
                {
                  model: Pachete,
                  as: "pachete",
                  attributes: [],
                  required: true,
                },
              ],
              required: true,
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
    res.status(500).json({ err: "Failed to fetch tari" });
  }
};

const getPachetDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const pachet = await Pachete.findOne({
      where: { id },
      include: [
        {
          model: Camere,
          as: "camera",
          attributes: ["pret", "descriere", "nr_persoane"],
          include: [
            {
              model: Cazare,
              as: "cazare",
              attributes: ["nume", "telefon", "descriere"],
              include: [
                {
                  model: Localitati,
                  as: "localitate",
                  attributes: ["denumire"],
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
          ],
        },
      ],
    });

    if (!pachet) {
      return res.status(404).json({ error: "Pachet not found" });
    }

    const dataSosire = moment(pachet.data_checkin);
    const dataPlecare = moment(pachet.data_checkout);
    const zileStare = dataPlecare.diff(dataSosire, "days") + 1;
    const pretCameraTotal = zileStare * (pachet?.camera?.pret || 0);
    const pretTotal = pretCameraTotal + (pachet?.zbor?.pret || 0);

    console.log(zileStare);

    const result = {
      ...pachet.toJSON(),
      pret: pretTotal,
    };

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching package details:", err);
    res.status(500).json({ error: "Failed to fetch package details" });
  }
};

const getOrase = async (req, res) => {
  try {
    const orase = await Localitati.findAll();
    res.set("Content-Type", "application/json");
    res.status(200).json(orase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to fetch tari" });
  }
};
const getAeropoarte = async (req, res) => {
  try {
    const aeropoarte = await Zboruri.findAll({
      attributes: [
        [Sequelize.col("localitatePlecare.denumire"), "denumire"],
        "id_loc_plecare", 
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
    res.status(500).json({ err: "Failed to fetch tari" }); 
  }
};
const cautarePachete = async (req, res) => {
  try {
    const { destination, departureCity, date, numPersons, tara, tip } =
      req.body;

    const idDestination = destination?.id || null; 
    const idDepartureCity = departureCity?.id || null; 

    if (!date || !numPersons) {
      return res
        .status(400)
        .json({ error: "Parametrii 'date' și 'numPersons' sunt obligatorii!" });
    }
    console.log(date);
    const includeFilters = [];
    if (tip !== "cazare") {
      includeFilters.push({
        model: Zboruri,
        as: "zbor",
        attributes: ["pret", "data_plecare"], 
      });
    }


    const pachete = await Pachete.findAll({
      include: [
        ...includeFilters,
        {
          model: Camere,
          as: "camera",
          attributes: ["nr_persoane", "pret"], 
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
      ],
      where: {
        id_zbor:
          tip === "cazare"
            ? {
                [Op.eq]: null,
              }
            : { [Op.ne]: null },
        data_checkin: {
          [Op.gt]: new Date(date),
        },
      },
    });

    const pacheteCuPret = pachete.map((pachet) => {
      const dataSosire = moment(pachet.data_checkin);
      const dataPlecare = moment(pachet.data_checkout);
      const zileStare = dataPlecare.diff(dataSosire, "days") + 1;
      console.log(pachet?.camera?.pret);
      const pretCameraTotal = zileStare * (pachet?.camera?.pret || 0);
      const pretTotal = pretCameraTotal + (pachet?.zbor?.pret || 0);
      console.log(pretCameraTotal);

      return {
        ...pachet.toJSON(),
        pret: pretTotal,
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
    formattedCheckin.setHours(15, 0, 0, 0);

    const formattedCheckout = new Date(data_checkout);
    formattedCheckout.setHours(10, 0, 0, 0);

    if (!idCazare || !data_checkin || !data_checkout) {
      return res.status(400).json({ err: "Missing required fields" });
    }

    if (new Date(data_checkin) >= new Date(data_checkout)) {
      return res
        .status(400)
        .json({ err: "Check-in date must be before check-out date" });
    }

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

    const newPachet = await Pachete.create({
      id_camera: availableCamera.id,
      id_zbor: idZbor || null,
      data_checkin: formattedCheckin,
      data_checkout: formattedCheckout,
    });

    res.status(201).json(newPachet);
  } catch (error) {
    console.error("Error adding pachet:", error);
    res.status(500).json({ err: "Failed to add pachet" });
  }
};
const addZbor = async (req, res) => {
  try {
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

    if (!idPlecare || !idSosire || !data_plecare || !data_sosire || !pret) {
      return res
        .status(400)
        .json({ error: "Toate câmpurile sunt obligatorii!" });
    }

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

    res.status(201).json({ message: "Zbor adăugat cu succes!", zbor: nouZbor });
  } catch (error) {
    console.error("Eroare la adăugarea zborului:", error);
    res.status(500).json({ error: "A apărut o eroare la adăugarea zborului." });
  }
};
const addCazare = async (req, res) => {
  try {
    const { nume, telefon, descriere, localitate_id, id_tara } = req.body;

    if (!nume || !telefon || !localitate_id) {
      return res
        .status(400)
        .json({ error: "Toate câmpurile obligatorii trebuie completate." });
    }

    const localitate = await Localitati.findByPk(localitate_id);
    if (!localitate) {
      return res
        .status(404)
        .json({ error: "Localitatea selectată nu există." });
    }

    const cazareNoua = await Cazare.create({
      nume,
      telefon,
      descriere,
      id_loc: localitate_id,
      id_tara,
    });

    res.status(201).json({
      message: "Cazarea a fost adăugată cu succes.",
      cazare: cazareNoua,
    });
  } catch (error) {
    console.error("Eroare la adăugarea cazării:", error);
    res.status(500).json({ error: "A apărut o eroare la server." });
  }
};
const getLocalitati = async (req, res) => {
  try {
    const { id_tara } = req.body;

    if (!id_tara) {
      return res.status(400).json({ error: "id_tara is required" });
    }

    const localitati = await Localitati.findAll({
      where: {
        id_tara: id_tara,
      },
      attributes: ["id", "denumire"],
    });

    res.status(200).json(localitati);
  } catch (error) {
    console.error("Error fetching localitati:", error);
    res.status(500).json({ error: "Failed to fetch localitati" });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID-ul clientului este necesar." });
    }

    const client = await Clienti.findOne({
      include: [
        {
          model: Clienti_detalii,
          as: "clienti_detalii",
        },
      ],
      where: { id },
    });

    if (!client) {
      return res.status(404).json({ error: "Clientul nu a fost găsit." });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Eroare la fetch-ul detaliilor clientului:", error);
    res.status(500).json({ error: "A apărut o problemă la server." });
  }
};
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nume, email, telefon, adresa, cnp } = req.body;

    const client = await Clienti.findOne({ where: { id } });
    const clienti_detalii = await Clienti_detalii.findOne({
      where: { id_client: id },
    });

    if (!client) {
      return res.status(404).json({ error: "Clientul nu a fost găsit." });
    }
    if (!clienti_detalii) {
      return res
        .status(404)
        .json({ error: "Detaliile clientului nu au fost găsite." });
    }

    await client.update({ nume, email });
    await clienti_detalii.update({ telefon, adresa, cnp });

    res.status(200).json({ message: "Client actualizat cu succes." });
  } catch (error) {
    console.error("Eroare la actualizarea clientului:", error);
    res.status(500).json({ error: "A apărut o problemă la server." });
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
  getPachetDetails,
  addPachet,
  addZbor,
  addCazare,
  getCazareAngajat,
  getLocalitati,
  getClientById,
  updateClient,
};
