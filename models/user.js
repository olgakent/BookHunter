const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Book = require('./book');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
	verified: Boolean,
	first: String,
	last: String,
	username: {type: String, unique: true, required:true},
	password: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date, // token expires in 1 hour
	library: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'
	}],
	wishlist: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
