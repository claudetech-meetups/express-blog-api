var express  = require('express'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_api');

var db = mongoose.connection;

db.on('error', function (err) {
  console.warn("Could not connect to mongodb");
  process.exit(1);
});

db.once('open', function () {
  var app = express();
  app.use('/posts',      require('./routes/posts'));
  app.use('/categories', require('./routes/categories'));

  app.listen(5000);
});
