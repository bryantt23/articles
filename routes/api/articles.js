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
    console.log('comment yes', comment);
    User.find({ _id: comment.author }).then(user => {
      console.log('user', user);
      comment.author = { handle: user[0].handle, email: user[0].email };
      resolve(comment);
    });
  });
}

async function getCommentsWithUserInfo(comments) {
  let res = [];
  let promises = [];

  for (let comment of comments) {
    promises.push(doSomethingAsync(comment));
  }

  return Promise.all(promises).then(results => {
    res = [...results];
    return Promise.resolve(res);
  });
}

// https://stackoverflow.com/questions/14504385/why-cant-you-modify-the-data-returned-by-a-mongoose-query-ex-findbyid
router.get('/:articleId', (req, res) => {
  console.log('articleId', req.params);
  Article.find({ _id: req.params.articleId })
    .lean()
    .populate('comments', 'text author date')
    .populate('User', 'handle date')
    // .populate('author', 'handle date')
    .exec(async function (err, article) {
      let commentsWithUserInfo = await getCommentsWithUserInfo(
        article[0].comments
      );
      console.log('commentsWithUserInfo', commentsWithUserInfo);
      /*
      for (let comment of article[0].comments) {
        const { author } = comment;
        console.log(author);
        console.log(comment);
        comment.blah = 'foo';
        User.findById(author).then(info => {
          console.log('info', info);
          comment.authorInfo = info;
        });
      }*/
      article[0].comments = commentsWithUserInfo;

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
