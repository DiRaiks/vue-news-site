const express = require('express');
const router = express.Router();
const registrController = require('../db/controllers').users;

router.post('/', registrController.login);
router.get('/:id', registrController.infoUser);
router.get('/', registrController.list);
router.put('/:id', registrController.editUser);


module.exports = router;