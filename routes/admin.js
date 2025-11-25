const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { isAdmin } = require('../middleware/auth'); // <- import middleware

// Login page
router.get('/login', (req, res) => {
  res.render('admin/login', { error: null });
});

// Handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    req.session.loggedIn = true;
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { error: 'Invalid credentials' });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

// Dashboard (list all posts)
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.render('admin/dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading dashboard');
  }
});

// Show add post form
router.get('/posts/new', isAdmin, (req, res) => {
  res.render('admin/add-post');
});

// Create new post
router.post('/posts', isAdmin, async (req, res) => {
  try {
    const { title, body } = req.body;
    await Post.create({ title, body });
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
});

// Show edit post form
router.get('/posts/:id/edit', isAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    res.render('admin/edit-post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post');
  }
});

// Update post
router.put('/posts/:id', isAdmin, async (req, res) => {
  try {
    const { title, body } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, body });
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating post');
  }
});

// Delete post
router.delete('/posts/:id', isAdmin, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting post');
  }
});

module.exports = router;




