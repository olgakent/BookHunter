const mongoose = require('mongoose');
const User = require('./user');
const Schema =  mongoose.Schema;

const BookSchema = new mongoose.Schema({
	book_id: String,
  book_title: String,
  book_link: String,
	book_publisher: String,
  book_thumbnail: String,
	book_owner: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'}]
});

const Book = module.exports = mongoose.model('book', BookSchema);
