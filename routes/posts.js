var express = require('express'),
    router  = express.Router(),
    models  = require('../models');


router.get('/', function (req, res) {
  models.Post.find(function (err, posts) {
    if (err) return res.status(500).json({error: err.message});
    res.json(posts);
  });
});

module.exports = router;
