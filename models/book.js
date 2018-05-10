const mongoose = require('mongoose');
const User = require('./user');
const Schema =  mongoose.Schema;

const BookSchema = new mongoose.Schema({
  book_id: String,
  book_title: String,
  book_author: [String],
  book_link: String,
  book_publisher: String,
  book_thumbnail: String,
  book_owner: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      },
      username: String
  },
  inWishlist: Boolean,
  inLibrary: Boolean
});

const Book = module.exports = mongoose.model('book', BookSchema);
