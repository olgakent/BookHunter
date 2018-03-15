const express = require('express');
const models = require('../models');

const router = express.Router();

// Define a route to the root of the application.
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});


module.exports = router;
