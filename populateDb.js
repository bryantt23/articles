#! /usr/bin/env node

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
const { Status, Category } = require('./models/Enums');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var articles = [];

function articleCreate(title, description, status, isDeleted, category, cb) {
  var article = new Article({
    title,
    description,
    status,
    isDeleted,
    category
  });

  article.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New article: ' + article);
    articles.push(article);
    cb(null, article);
  });
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
      }
    ],
    // optional callback
    cb
  );
}

async.series(
  [createArticles],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('articles: ' + articles);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
