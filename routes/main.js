const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // newest first
    console.log(posts); // debug: should print the posts array
    res.render('index', { posts });
  } catch (err) {
    console.error(err);
    res.send('Error retrieving posts');
  }
});

module.exports = router;




