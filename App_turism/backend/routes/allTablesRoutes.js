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
  cautarePachete,
} = require("../controllers/allTablesController");

// require("../models/index");

const router = express.Router();
// router.get(allTablesController.g)

router.get("/camere", getCamere);
router.get("/getCazare", getCazare);
router.get("/getPachete", getPachete);
router.get("/getZboruri", getZboruri);
router.get("/tari", getTari);
router.get("/orase", getOrase);
router.get("/aeropoarte", getAeropoarte);
router.post("/cautarePachete", cautarePachete);
router.post("/cautareZboruri", getZboruri);

module.exports = router;
