const express = require('express');
const router = express.Router();
const Article = require('../../models/Article');
const User = require('../../models/User');

router.get('/', async (req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json(err));
});

function doSomethingAsync(comment) {
  return new Promise(resolve => {
    User.find({ _id: comment.author }).then(user => {
      comment.author = { handle: user[0].handle, email: user[0].email };
      resolve(comment);
    });
  });
}

async function getCommentsWithUserInfo(comments) {
  let promises = [];

  for (let comment of comments) {
    promises.push(doSomethingAsync(comment));
  }

  return Promise.all(promises).then(results => {
    return Promise.resolve(...results);
  });
}

// https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
// https://stackoverflow.com/questions/14504385/why-cant-you-modify-the-data-returned-by-a-mongoose-query-ex-findbyid
router.get('/:articleId', (req, res) => {
  Article.find({ _id: req.params.articleId })
    .lean()
    .populate({
      path: 'comments',
      select: 'text',
      populate: {
        path: 'author',
        model: 'users',
        select: 'handle email'
      }
    })
    .exec(async function (err, article) {
      // let commentsWithUserInfo = await getCommentsWithUserInfo(
      //   article[0].comments
      // );
      // article[0].comments = commentsWithUserInfo;

      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log('article', article);
        res.json(article);
      }
    });
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
