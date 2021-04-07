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
const Comment = require('./models/Comment');
const { Status, Category } = require('./frontend/src/constants/Enums');
const bcrypt = require('bcryptjs');
const labels = require('./frontend/src/constants/Labels');

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
  comments,
  labels,
  cb
) {
  var article = new Article({
    title,
    description,
    status,
    isDeleted,
    category,
    author,
    comments,
    labels
  });

  article.save(function (err) {
    if (err) {
      console.log('err', err);
      console.log('err', err);
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
        console.log('err', err);
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
          console.log('err', err);
          console.log('err', err);
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
      },
      function (callback) {
        userCreate('jane', 'jane@gmail.com', '123123', callback);
      }
    ],
    // optional callback
    cb
  );
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFromArray(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

function doSomethingAsync(i) {
  return new Promise(resolve => {
    const text = `text ${i}`;
    const author = getRandomFromArray(users);
    const comment = new Comment({ text, author });
    comment.save(function (err) {
      if (err) {
        console.log('err', err);
        return;
      }
      console.log('New comment: ' + comment);
      resolve(comment);
    });
  });
}

async function generateComments() {
  let length = randomIntFromInterval(0, 3);
  let comments = [];
  let promises = [];

  for (let i = 0; i < length; i++) {
    promises.push(doSomethingAsync(i));
  }

  return Promise.all(promises).then(results => {
    comments = [...results];
    return Promise.resolve(comments);
  });
}

// https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
function getRandomLabels() {
  let n = randomIntFromInterval(0, labels.length);

  // Shuffle array
  const shuffled = [...labels].sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, n);

  return selected;
}

async function generateRandomArticles(cb) {
  for (let i = 0; i < 10; i++) {
    const author = getRandomFromArray(users);
    const isDeleted = i % 2 === 0 ? true : false;
    let comments = await generateComments();
    let labels = getRandomLabels();
    articleCreate(
      'Article number: ' + i,
      'Article description: ' + i,
      getRandomFromArray(Object.values(Status)),
      isDeleted,
      getRandomFromArray(Object.values(Category)),
      author,
      comments,
      labels,
      cb
    );
  }
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
      // All done, disconnect from database
      mongoose.connection.close();
    }
  }
);
