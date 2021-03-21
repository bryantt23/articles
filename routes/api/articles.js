const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../../models/Article');

router.get('/', async (req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json(err));
});

router.get('/:articleId', (req, res) => {
  console.log('articleId', req.params);
  Article.find({ _id: req.params.articleId })
    .then(article => res.json(article))
    .catch(err => res.status(400).json(err));
});

router.post('/', (req, res) => {
  console.log('article', req.body);
  const newArticle = new Article({
    ...req.body
  });

  newArticle
    .save()
    .then(article => res.json(article))
    .catch(e => {
      return res.status(400).json(e);
    });
});

// https://coursework.vschool.io/mongoose-crud/
router.put('/:articleId', (req, res) => {
  console.log('articleId', req.params, 'body', req.body);
  Article.findByIdAndUpdate(
    req.params.articleId,
    req.body,
    async (err, article) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(article);
    }
  );
});

module.exports = router;
