const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	first: String,
	last: String,
	username: String,
	password: String
	// library: [{title: String, author: String}],
	// wishlist: [{title: String, author: String}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
