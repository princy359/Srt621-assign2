const books = require("../models/books");

exports.getAllBooks = (req, res, next) => {
  books.find({}, (error, books) => {
    if (error) next(error);
    req.data = books;
    next();
  });
};
exports.getBook = (req, res, next) => {
  let id = req.params.book;
  books.findById(id, (error, books) => {
    if (error) next(error);
    req.data = books;
    console.log(req.data);
    next();
  });
};

exports.deleteBook = (req, res, next) => {
  let id = req.params.book;
  console.log(id);
  books.findByIdAndRemove(id, (error, books) => {
    if (error) next(error);
    res.redirect("/home");
  });
};
exports.createBook = (req, res) => {
  book = new books({
    book: req.body.bname,
    author: req.body.author,
    link: req.body.link,
  });
  book.save();
  res.redirect("/home");
};

