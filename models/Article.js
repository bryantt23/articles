const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import { Category, Status } from './Enums';

// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
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
  }
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;
