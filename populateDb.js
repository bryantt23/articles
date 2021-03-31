#! /usr/bin/env node
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

console.log(
  'This script populates articles to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
const Article = require('./models/Article');
const User = require('./models/User');
const { Status, Category } = require('./frontend/src/constants/Enums');
const bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var articles = [];
var users = [];

function articleCreate(
  title,
  description,
  status,
  isDeleted,
  category,
  author,
  cb
) {
  var article = new Article({
    title,
    description,
    status,
    isDeleted,
    category,
    author
  });

  article.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New article: ' + article);
    articles.push(article);
    // cb(null, article);
  });
}

function userCreate(handle, email, password, cb) {
  var newUser = new User({
    handle,
    email,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        cb(err, null);
        return;
      }
      newUser.password = hash;
      newUser
        .save()
        .then(newUser => {
          console.log('New user: ' + newUser);
          users.push(newUser);
          cb(null, newUser);
        })
        .catch(err => {
          console.log(err);
          cb(err, null);
        });
    });
  });
}

function createUsers(cb) {
  async.parallel(
    [
      function (callback) {
        userCreate('bry', 'bry@gmail.com', '123123', callback);
      },
      function (callback) {
        userCreate('john', 'john@gmail.com', '123123', callback);
      }
    ],
    // optional callback
    cb
  );
}

function getRandomFromArray(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

function generateRandomArticles(cb) {
  for (let i = 0; i < 10; i++) {
    const author = i % 2 === 0 ? users[0] : users[1];
    const isDeleted = i % 2 === 0 ? true : false;
    articleCreate(
      'Article number: ' + i,
      'Article description: ' + i,
      getRandomFromArray(Object.values(Status)),
      isDeleted,
      getRandomFromArray(Object.values(Category)),
      author,
      cb
    );
  }
}

function createArticles(cb) {
  async.parallel(
    [
      function (callback) {
        articleCreate(
          'First article',
          'First article description',
          Status.PAST,
          false,
          Category.ACCOUNT_INFO,
          callback
        );
      },
      function (callback) {
        articleCreate(
          'Second article',
          'Second article description. This article is very long, very long',
          Status.PAST,
          false,
          Category.ACCOUNT_INFO,
          callback
        );
      },
      function (callback) {
        articleCreate(
          'Deleted article',
          'Deleted article description',
          Status.FUTURE,
          true,
          Category.REFUNDS,
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUsers, generateRandomArticles],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('users: ' + users);
      console.log('articles: ' + articles);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
