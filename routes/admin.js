const express = require('express');
const router = express.Router();

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

// Dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/admin/login');
  }
  res.render('admin/dashboard');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

module.exports = router;

