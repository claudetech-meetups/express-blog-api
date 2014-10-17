var request = require('supertest'),
    config  = require('../config').test;

describe('Posts', function () {
  var app;

  beforeEach (function (done) {
    require('../app')(config, function (a) {
      app = a;
      done();
    });
  });

  describe('GET /', function () {
    it('should success', function () {
      request(app).get('/posts').expect(200);
    });
  });

});
