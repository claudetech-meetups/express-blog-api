var express = require('express'),
    router  = express.Router();

router.get('/', function (req, res) {
    res.json({router: 'categories', path: '/'});
});

module.exports = router;
