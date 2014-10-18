var env    = process.env.NODE_ENV || 'dev',
    config = require('./config');

require('./app')(config[env], function (err, app) {
  if (err) {
    console.warn(err);
    process.exit(1);
  }
  app.listen(5000);
});
