const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const books = require('google-books-search');
const flash = require('connect-flash');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

// load environment variables
dotenv.load();

// Database setup
const mongoose = require('mongoose');
const User = require('./models/user');

// mongoose.connect('mongodb://localhost/BookHunter');
mongoose.connect(process.env.MLAB_DB);

// User auth
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Passport setup
app.use(require('express-session')({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));



// Flash messages
app.use(function(req, res, next){
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.warning = req.flash("warning");
	next();
});



// Serve up static assets from public folder
app.use(express.static(__dirname + "/public"));

// Set up handlebars (use templates from views/)
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);

// Load all controllers
const controllers = require('./controllers');
app.use(controllers);


// Start listening
app.listen(PORT, () => {
    console.log("Server is up and running on port " + PORT);
});
