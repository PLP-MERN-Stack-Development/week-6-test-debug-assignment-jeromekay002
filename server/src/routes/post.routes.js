const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/postController');

// @route   GET /api/posts
router.get('/', getPosts);

// @route   POST /api/posts
router.post('/', createPost);

module.exports = router;
