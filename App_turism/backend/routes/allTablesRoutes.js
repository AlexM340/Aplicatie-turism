const express = require("express");
const {
  getPachete,
  getTari,
  getZboruri,
  getCamere,
  getCazare,
  getOrase,
  getAeropoarte,
  cautarePachete,
  getPachetDetails,
  addPachet,
  addZbor,
  getCazareAngajat,
  addCazare,
  getLocalitati,
  getClientById,
  updateClient
} = require("../controllers/allTablesController");

// require("../models/index");

const router = express.Router();

router.get("/camere", getCamere);
router.get("/getCazare", getCazare);
router.get("/getCazareAngajat", getCazareAngajat);
router.get("/getPachete", getPachete);
router.get("/getZboruri", getZboruri);
router.get("/tari", getTari);
router.get("/orase", getOrase);
router.get("/aeropoarte", getAeropoarte);
router.post("/cautarePachete", cautarePachete);
router.post("/addPachet", addPachet);
router.post("/addZbor", addZbor);
router.post("/addCazare", addCazare);
router.post("/cautareZboruri", getZboruri);
router.post("/getLocalitati", getLocalitati);
router.get("/pachete/:id", getPachetDetails);
router.get("/clienti/:id", getClientById);
router.put("/clienti/:id", updateClient);

module.exports = router;
