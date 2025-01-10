const express = require("express");
// const allTablesController = require('../controllers/allTablesController');
const {
  getPachete,
  getTari,
  getZboruri,
  getCamere,
  getCazare,
  getOrase,
  getAeropoarte,
  cautarePachete
} = require("../controllers/allTablesController");

// require("../models/index");

const router = express.Router();
// router.get(allTablesController.g)

router.get("/camere", getCamere);
router.get("/cazare", getCazare);
router.get("/pachete", getPachete);
router.get("/zboruri", getZboruri);
router.get("/tari", getTari);
router.get("/orase", getOrase);
router.get("/aeropoarte", getAeropoarte);
router.post("/cautarePachete", cautarePachete);

module.exports = router;
