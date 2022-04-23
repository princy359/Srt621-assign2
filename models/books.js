const mongoose = require("mongoose"),
  booksSchema = mongoose.Schema({
    book: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  });
module.exports = mongoose.model("books", booksSchema);