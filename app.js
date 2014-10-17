var express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    db         = mongoose.connection;

mongoose.connect('mongodb://localhost/blog_api');

db.on('error', function (err) {
  console.warn("Could not connect to mongodb");
  process.exit(1);
});

db.once('open', function () {
  var app = express();
  app.use(bodyParser.json());
  app.use(function (err, req, res, next) {
    if (err) res.status(500).json({error: err.message});
  });

  app.use('/posts',      require('./routes/posts'));
  app.use('/categories', require('./routes/categories'));

  app.listen(5000);
});

var __options = mongoose.Schema.prototype.defaultOptions;
mongoose.Schema.prototype.defaultOptions = function (options) {
  options = __options.apply(this, arguments);
  options.toJSON = options.toJSON || {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  };
  return options;
};
