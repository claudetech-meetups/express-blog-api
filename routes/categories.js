var express = require('express'),
    models  = require('../models'),
    router  = express.Router();

router.get('/', function (req, res) {
  models.Category.find(function (err, categories) {
    if (err) return res.status(500).json({error: err.message});
    res.json(categories);
  });
});

router.post('/', function (req, res) {
  models.Category.create(req.body, function (err, category) {
    if (err) return res.status(500).json({error: err.message});
    res.json(category);
  });
});

module.exports = router;
