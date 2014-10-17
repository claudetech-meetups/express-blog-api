var env    = process.env.NODE_ENV || 'dev',
    config = require('./config');

require('./app')(config[env]);
