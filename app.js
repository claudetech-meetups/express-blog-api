var express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    cors       = require('cors'),
    db         = mongoose.connection;


module.exports = function (config, callback) {
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

  mongoose.connect(config.mongo_url);

  db.on('error', function (err) {
    console.warn("Could not connect to mongodb");
    console.warn(err);
    callback(err);
  });

  db.once('open', function () {
    var app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(function (err, req, res, next) {
      if (err) res.status(500).json({error: err.message});
    });

    app.use('/posts',      require('./routes/posts'));
    app.use('/categories', require('./routes/categories'));

    callback(null, app);
  });
};
