var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: String,
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Category', categorySchema);
