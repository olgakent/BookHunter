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
		username: req.body.username,
		library: [
			{
				title: "Fred", 
				author: "Anne", 
				thumbnail: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png"
			},
			{
				title: "Game", 
				author: "George", 
				thumbnail: "https://www.rachelneumeier.com/wp-content/uploads/2013/05/GameOfThrones1.jpg"
			},
			{
				title: "Jurassic Park",
				author: "Mike",
				thumbnail: "https://shortlist.imgix.net/app/uploads/2012/06/24225443/the-50-coolest-book-covers-37.jpg"
			},
			{
				title: "Goosebumps",
				author: "Stine",
				thumbnail: "https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2015/10/night-of-the-living-dummy-goosebumps-book-covers.jpg"
			}
			]
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
	User.find({}, function(err, allUsers) {
		if(err) {
			console.log(err);
		} else {
			res.render("allbooks", {users: allUsers});
		}
	});
});

// Help Page route
router.get('/help', (req, res) => {
  res.render('help');
});

module.exports = router;
