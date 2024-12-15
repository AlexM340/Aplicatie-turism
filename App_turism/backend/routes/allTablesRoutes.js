const express = require("express");
// const allTablesController = require('../controllers/allTablesController');
const {
  getPachete,
  getTari,
  getZboruri,
  getCamere,
  getCazare,
} = require("../controllers/allTablesController");

// require("../models/index");

const router = express.Router();
// router.get(allTablesController.g)

router.get("/camere", getCamere);
router.get("/cazare", getCazare);
router.get("/pachete", getPachete);
router.get("/zboruri", getZboruri);
router.get("/tari", getTari);

module.exports = router;
