const express = require('express');
const router = express.Router();
const registrController = require('../db/controllers').registr;

router.post('/', registrController.create);
router.get('/', registrController.list);


module.exports = router;