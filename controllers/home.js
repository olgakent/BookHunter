const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const nodemailer = require('nodemailer');


function isLoggedIn(req, res, next) {
	if(!req.isAuthenticated()) {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login");
	}
	else{
		next();
	}
}


// Define a route to the root of the application.
router.get('/', (req, res) => {
  res.render('home', {currentUser: req.user});
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
				title: "Fred the Lonely Monster",
				author: "Anne Lowinsky",
				thumbnail: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png"
			},
			{
				title: "A Game of Thrones",
				author: "George R.R. Martin",
				thumbnail: "https://www.rachelneumeier.com/wp-content/uploads/2013/05/GameOfThrones1.jpg"
			},
			{
				title: "Jurassic Park",
				author: "Michael Crichton",
				thumbnail: "https://shortlist.imgix.net/app/uploads/2012/06/24225443/the-50-coolest-book-covers-37.jpg"
			},
			{
				title: "Goosebumps Night of the Living Dummy",
				author: "R.L. Stine",
				thumbnail: "https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2015/10/night-of-the-living-dummy-goosebumps-book-covers.jpg"
			}
			],
  wishlist:[
    {
      title: "Computer Architecture",
      author: "David Patterson",
      thumbnail: "https://lh3.googleusercontent.com/proxy/CzdVEzKtZqWZ3NTw16Wkf2WyrrVKBRqQba7nqjYdw3L89HCiAL6k78LOcRStvHinfiUjKqBjXDbkzUySu9WUACogsOfwU7g1g21SaR5s1MmN5A-62Axd5ZD0kQas2G_eUgN--S1HEysgNRN6ZVZYQ4qAeL1c2V8UPHQR8Pr-1kvWM7I7sa8=s500-pd-e365-pc0xffffff"
    }
  ]
});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			req.flash("error", "A user with that email already exists.");
			res.redirect('signup');
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
		successRedirect: '/profile', // Should redirect to books page when implemented
		failureRedirect: 'login'
	}), (req, res) => {

});


// Log out route
router.get("/logout", isLoggedIn, function(req, res) {
	req.logout();
	req.flash("success", "Successfully logged out.");
	res.redirect("/login");
});

// All Books route
router.get('/allbooks', isLoggedIn, (req, res) => {
	User.find({}, function(err, allUsers) {
		if(err) {
			console.log(err);
		} else {
			res.render("allbooks", {users: allUsers, currentUser: req.user});
		}
	});
});

// Help Page route
router.get('/help', (req, res) => {
  res.render('help', {currentUser: req.user});
});

// Contact form submission route
router.post('/send', (req, res) => {
  const output = `
		<p>You have a new contact request:</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Name: ${req.body.contact_name}</li>
			<li>Email: ${req.body.contact_email}</li>
			<li>Subject: ${req.body.contact_subject}</li>
		</ul>
		<h3>Message</h3>
		<p>${req.body.contact_message}</p>
	`;

	// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <test@bookhunter.com', // sender address
      to: 'bookhunter.huntercollege@gmail.com', // list of receivers
      subject: 'New message from contact form at BookHunter.com', 
      text: "Hello Boookhunter!",
			html: output
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

			// rerender our home page with message
			res.render('home', {msg: "Thank you! Email has been sent."});
  });

});

// Testing profile page
router.get('/profile', isLoggedIn, (req, res) => {
  User.find({}, function(err, allUsers) {
    if(err) {
      console.log(err);
    } else {
      res.render("profile", {users: allUsers, currentUser: req.user});
    }
  });
});

// Testing Add Book page
router.get('/addbook', isLoggedIn, (req, res) => {
  res.render('addbook', {currentUser: req.user});
});

module.exports = router;
