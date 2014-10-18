var request = require('supertest'),
    expect  = require('chai').expect,
    config  = require('../config').test;

describe('Posts', function () {
  var app, models, categories;

  before(function (done) {
    require('../app')(config, function (err, a) {
      if (err) return done(err);
      models  = require('../models');
      categories = [];
      models.Category.create([{name: "foo"}, {name: "bar"}], function (err, cat1, cat2) {
        categories.push(cat1);
        categories.push(cat2);
      });
      app = a;
      done();
    });
  });

  after(function (done) {
    models.Category.remove({}, function (err) {
      require('mongoose').connection.close();
      done(err);
    });
  });

  beforeEach(function (done) {
    models.Post.remove({}, function (err) {
      done(err);
    });
  });

  describe('GET /posts', function () {
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

    it('should filter with categoryId', function (done) {
      models.Post.create([
        {title: "post1", content: "post2", categoryId: categories[0]._id},
        {title: "post1", content: "post2", categoryId: categories[1]._id}
      ], function (err, expected) {
        expect(err).to.be.null;
        request(app)
          .get('/posts?category_id=' + categories[0]._id.toString())
          .expect(200)
          .expect(function (res) {
            body = JSON.parse(res.text);
            expect(body.length).to.eq(1);
            var post = body[0];
            expect(post.id).to.eq(expected._id.toString());
            expect(post.title).to.eq(expected.title);
            expect(post.content).to.eq(expected.content);
            expect(post.categoryId).to.eq(expected.categoryId.toString());
          })
          .end(done)
      });
    });
  });

  describe('GET /posts/:id', function () {
    it('should fail with bad OID', function (done) {
      request(app)
        .get('/posts/foo')
        .expect(500)
        .end(done);
    });

    it('should return 404 with non existing OID', function (done) {
      request(app)
        .get('/posts/5441f8033e9b22331737fbd1')
        .expect(404)
        .end(done);
    });

    it('should return existing post', function (done) {
      models.Post.create({title: "foo", content: "bar"}, function (err, expected) {
        request(app)
        .get('/posts/' + expected.id.toString())
        .expect(200)
        .expect(function (res) {
          post = res.body;
          expect(post.id).to.eq(expected._id.toString());
          expect(post.title).to.eq(expected.title);
          expect(post.content).to.eq(expected.content);
        })
        .end(done);
      });
    });

  });
});
