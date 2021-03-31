const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Category, Status } = require('../frontend/src/constants/Enums');
const User = require('../models/User');

// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const ArticleSchema = new Schema({
  title: {
    type: String,
    minLength: 1,
    required: true
  },
  description: {
    type: String,
    minLength: 1,
    required: true
  },
  status: {
    type: String,
    enum: Status,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  category: {
    type: String,
    enum: Category,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;
