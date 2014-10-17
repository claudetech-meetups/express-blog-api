var express  = require('express'),
    router   = express.Router(),
    ObjectId = require('mongoose').Schema.Types.ObjectId,
    models   = require('../models');


router.get('/', function (req, res) {
  models.Post.find(function (err, posts) {
    if (err) return res.status(500).json({error: err.message});
    res.json(posts);
  });
});

router.get('/:id', function (req, res) {
  models.Post.findOne({_id: req.params.id}, function (err, post) {
    if (err) return res.status(500).json({error: err.message});
    if (!post) return res.status(404).json({error: "not found"});
    res.json(post);
  });
});

router.post('/', function (req, res) {
  models.Post.create(req.body, function (err, post) {
    if (err) return res.status(500).json({error: err.message});
    res.status(201).json(post);
  });
});

module.exports = router;
