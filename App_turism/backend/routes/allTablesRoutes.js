const express = require('express')
const allTablesController = require('../controllers/allTablesController');
const { getPachete } = require('../controllers/allTablesController');
const { getZboruri } = require('../controllers/allTablesController');
const { getCamere } = require('../controllers/allTablesController');
const { getCazare } = require('../controllers/allTablesController');

const router = express.Router();
router.get(allTablesController.g)

router.get('/camere', getCamere);
router.get('/cazare', getCazare);
router.get('/pachete', getPachete);
router.get('/zboruri', getZboruri);

module.exports = router;