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

module.exports = router;
