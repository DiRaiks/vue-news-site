const News = require('../models').Newses;


module.exports = {
    create(req, res) {
      let filename = '';
      if(req.file) {
        filename = req.file.filename
      } else {
        filename = 'no-news.png'
      }
        return News
            .create({
                tag: req.body.tag,
                theme: req.body.theme,
                author: req.body.author,
                text: req.body.text,
                authorId: req.params.authorId,
                newsImage: filename
            })
            .then(news => res.status(201).send(news))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return News
            .findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(news => res.status(200).send(news))
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
      console.log('--->123', req.params)
      return News
            .findById(req.params.id)
            .then(news => {
                if (!news) {
                    return res.status(400).send({
                        message: 'Todo Not Found'
                    });
                }
                return news
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    listForUser(req, res) {
        return News
            .findAll({
                where: {
                    authorId: req.params.authorId
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(news => res.status(200).send(news))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return News
            .findById(req.params.id)
            .then(news => {
                if(!news) {
                    req.status(404).send('nooooooo')
                }
                return news
                    .update(req.body.content)
                    .then(() => res.status(200).send(news))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};
