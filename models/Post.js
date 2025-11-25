const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);



