var request = require('supertest'),
    expect  = require('chai').expect,
    config  = require('../config').test;

describe('Posts', function () {
  var app, models;

  before(function (done) {
    require('../app')(config, function (err, a) {
      models  = require('../models');
      if (err) return done(err);
      app = a;
      done();
    });
  });

  after(function () {
    require('mongoose').connection.close();
  });

  beforeEach(function (done) {
    models.Post.remove({}, function (err) {
      done(err);
    });
  });

  describe('GET /', function () {
    it('should success', function (done) {
      request(app)
        .get('/posts')
        .expect(200)
        .end(done);
    });

    it('should return all posts', function (done) {
      models.Post.create({title: "foo", content: "bar"}, function (err, expected) {
        request(app)
        .get('/posts')
        .expect(200)
        .expect(function (res) {
          body = JSON.parse(res.text);
          expect(body.length).to.eq(1);
          var post = body[0];
          expect(post.id).to.eq(expected._id.toString());
          expect(post.title).to.eq(expected.title);
          expect(post.content).to.eq(expected.content);
        })
        .end(done);
      });
    });
  });
});
