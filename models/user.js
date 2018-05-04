const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	// verified: Boolean,
	first: String,
	last: String,
	username: String,
	password: String,
	library: [{title: String, author: String, thumbnail: String}],
	wishlist: [{title: String, author: String, thumbnail: String}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
