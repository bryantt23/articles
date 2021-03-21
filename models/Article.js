const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Category, Status } = require('./Enums');

// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    required: true
  },
  status: {
    type: String,
    enum: Status,
    required: true
  },
  category: {
    type: String,
    enum: Category,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;
