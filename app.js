const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoUri;
const articles = require('./routes/api/articles');

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/articles', articles);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
