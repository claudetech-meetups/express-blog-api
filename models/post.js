var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  content: String,
  categoryId: mongoose.Schema.Types.ObjectId,
  createdAt: Date
});

module.exports = mongoose.model('Post', postSchema);
