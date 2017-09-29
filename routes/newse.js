const express = require('express');
const router = express.Router();
const newsController = require('../db/controllers').newses;
const multer = require('multer');



const storage = multer.diskStorage({
  destination: '../../NewsImages',
  filename(req, file, cb) {
    cb(null, `${new Date()}+${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(null)
    }
    callback(null, true)
  }
});

router.post('/:authorId', upload.single('file'), newsController.create);
router.get('/', newsController.list);
router.delete('/:id', newsController.destroy);
router.get('/:authorId', newsController.listForUser);
router.put('/:id', newsController.update);


module.exports = router;
