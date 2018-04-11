const express = require('express');
//const models = require('../models');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

// Define a route to the root of the application.
router.get('/', (req, res) => {
  res.render('home');
});



// Sign up routes
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
	var newUser = new User(
	{
		first: req.body.first_name,
		last: req.body.last_name,
		username: req.body.username
	});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			// Need to alert user if email has already been used
			return res.render('signup');
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('login');
		});
	});
});



// Log in routes
router.get('/login', (req, res) => {
  res.render('login');
});



router.post('/login', passport.authenticate('local',
	{
		successRedirect: '/', // Should redirect to books page when implemented
		failureRedirect: 'login'
	}), (req, res) => {

});


// Log out route
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/login");
});

// All Books route
router.get('/allbooks', (req, res) => {
  res.render('allbooks');
});

// Help Page route
router.get('/help', (req, res) => {
  res.render('help');
});

module.exports = router;
