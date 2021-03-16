const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../../models/Article');

router.get('/', async (req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json(err));
  //   console.log('in articles api');
  //   const articles = await fetch(`/articles`);
  //   console.log(articles);
  //   const data = await articles.json();
  //   console.log(data);
  //   return res.json(data);
});

module.exports = router;
