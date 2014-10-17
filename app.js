var express  = require('express'),
    mongoose = require('mongoose'),
    db       = mongoose.connection;

mongoose.connect('mongodb://localhost/blog_api');

db.on('error', function (err) {
  console.warn("Could not connect to mongodb");
  process.exit(1);
});

// var __options = mongoose.Schema.prototype.defaultOptions;
// mongoose.Schema.prototype.defaultOptions = function (options) {
//   options = __options.apply(this, arguments);
//   options.toObject = options.toObject || {
//     transform: function (doc, ret, options) {
//       ret.id = ret._id;
//       delete ret._id;
//       return ret;
//     }
//   };
//   return options;
// };

db.once('open', function () {
  var app = express();
  app.use('/posts',      require('./routes/posts'));
  app.use('/categories', require('./routes/categories'));

  app.listen(5000);
});
