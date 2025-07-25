// server/src/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
