const express = require('express');
const bodyParser = require('body-parser');
//const models = require('./models');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb://localhost/BookHunter');

// User auth
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Passport setup
app.use(require('express-session')({
	secret: "afnofj0afh",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Serve up static assets from public folder
app.use(express.static('./public'));

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
