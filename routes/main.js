const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Homepage - list all posts with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // posts per page
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.render('index', {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      loggedIn: req.session.loggedIn // admin logged in status
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading posts');
  }
});

// Show single post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.render('posts/show', { 
      post, 
      loggedIn: req.session.loggedIn // admin actions
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading post');
  }
});

module.exports = router;










