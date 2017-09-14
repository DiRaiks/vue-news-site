const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path')


const News = require('../db/models').Newses;
//
//
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

router.post('/', upload.single('file'), (req, res) => {

    console.log('req--', JSON.stringify(req.file));
    console.log('req--', req.file);
    console.log('req__e--', req.body);

    const file = req.file;


    return News
        .findById(req.body.news)
        .then(news => {
            return news
                .update({
                    newsImage: file.filename,
                })
        })
        .then(file => res.status(200).send(file))
        .catch(error => res.status(400).send(error));
});

router.get('/:id', (req, res) => {

    return News
        .findById(req.params.id)
        .then(news => {
            if (news.newsImage ) {
                res.status(200).send(news.newsImage)
            } else {
                res.send('no-news.png')
            }
        })
});



module.exports = router;
