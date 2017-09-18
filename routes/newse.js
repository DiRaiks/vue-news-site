const express = require('express');
const router = express.Router();
const newsController = require('../db/controllers').newses;

router.post('/:authorId', newsController.create);
router.get('/', newsController.list);
router.delete('/:id', newsController.destroy);
router.get('/:authorId', newsController.listForUser);
router.put('/:id', newsController.update);


module.exports = router;
