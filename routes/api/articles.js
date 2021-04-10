const express = require('express');
const router = express.Router();
const Article = require('../../models/Article');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const {
  articleValidationRules,
  validate
} = require('../../validation/validator');

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
        model: 'User',
        select: 'handle email'
      }
    })
    .exec(async function (err, article) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log('article', article);
        res.json(article);
      }
    });
});

router.post('/', articleValidationRules(), validate, (req, res) => {
  console.log('article', req.body);

  const newArticle = new Article({
    ...req.body
  });

  newArticle
    .save()
    .then(article => res.json(article))
    .catch(e => {
      console.log('error', e);
      return res.status(400).json({ errors: e.message });
    });
});

// https://coursework.vschool.io/mongoose-crud/
router.put('/:articleId', articleValidationRules(), validate, (req, res) => {
  console.log('articleId', req.params, 'body', req.body);
  Article.findOne({ _id: req.params.articleId }, (err, article) => {
    if (err) {
      return res.status(400).json({ errors: error.message });
    }

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

router.post('/:id/comments', async (request, response) => {
  if (!request.params.id) {
    return response.status(400).send({ message: 'Missing article id' });
  }

  try {
    const articleId = request.params.id;
    const commentText = request.body.comment;
    const userId = request.body.userId;
    console.log('commentText', commentText);
    console.log('userId', userId);

    const article = await Article.findOne({ _id: articleId });
    let { comments } = article;

    const comment = new Comment({ text: commentText, author: userId });
    comments.push(comment);

    await comment.save();
    console.log('New comment: ' + comment);
    await article.save();
    console.log('Article with new comment added: ' + JSON.stringify(article));
    return response.send({
      message: `Updated article: ${article}, commments to ${comments}`
    });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
    return response.status(400).json(error.message);
  }
});

module.exports = router;
