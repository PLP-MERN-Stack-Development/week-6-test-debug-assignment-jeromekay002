// src/routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { authenticate } = require('../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    const filter = category ? { category } : {};

    const posts = await Post.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

    res.status(200).json(posts);
});


// GET single post
router.get('/:id', authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching post' });
    }
});

// CREATE a post
router.post('/', authenticate, async (req, res) => {
    try {
        const { title, content, category } = req.body;
        if (!title || !content || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const post = new Post({ title, content, category });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: 'Invalid post data' });
    }
});

// UPDATE a post
router.put('/:id', authenticate, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: 'Error updating post' });
    }
});

// DELETE a post
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
    }
});

module.exports = router;
