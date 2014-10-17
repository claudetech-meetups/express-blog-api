var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.json({foo: "abc"});
});

app.use('/posts',      require('./routes/posts'));
app.use('/categories', require('./routes/categories'));

app.listen(5000);
