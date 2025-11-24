const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try {
    // Correct field name + faster rendering
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .lean();

    res.render('index', { posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Error retrieving posts');
  }
});

module.exports = router;





