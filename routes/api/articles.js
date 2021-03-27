const express = require('express');
const router = express.Router();
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
      return res.status(400).json(e.message);
    });
});

// https://coursework.vschool.io/mongoose-crud/
router.put('/:articleId', (req, res) => {
  console.log('articleId', req.params, 'body', req.body);
  Article.findOne({ _id: req.params.articleId }, (err, article) => {
    console.log('article', article);
    console.log('req.body', req.body);

    for (let key in req.body) {
      let val = req.body[key];
      article[key] = val;
    }
    console.log('article', article);
    // https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
    article.save(saveErr => {
      if (saveErr) {
        console.log('saveErr', saveErr);
        return res.status(500).send(saveErr.message);
      }
      res.send(article);
    });
  });
});

module.exports = router;
