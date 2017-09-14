const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')


const Login = require('../db/models').Author;
//
//
const storage = multer.diskStorage({
    destination: '../../UserImages',
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

router.post('/', upload.single('file'), (req, res) => {


    const file = req.file;

    return Login
        .findById(req.body.user)
        .then(user => {
            return user
                .update({
                    avatar: file.filename,
                })
        })
        .then(file => res.status(200).send(file))
        .catch(error => res.status(400).send(error));
});

router.get('/:id', (req, res) => {

    return Login
        .findById(req.params.id)
        .then(user => {
            if (user.avatar) {
                res.status(200).send(user.avatar)
            } else {
                res.send('no-avatar.png')
            }
        })
});



module.exports = router;
