const mongoose = require("mongoose");
const books = require("./models/books");
const methodOverride = require("method-override");
const booksController = require("./controllers/booksController");
const express = require("express"),
  app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);



//mongoose connection 
require("dotenv").config();
const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, { useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});



//add a book
app.get("/home", booksController.getAllBooks, (req, res, next) => {
  console.log(req.data);
  res.render("home", { books: req.data });
});
app.get("/AddNewBook", (req, res, next) => {
  res.render("bookAdd");
});
app.post("/create", booksController.createBook);



//delete a book
app.get("/DeleteABook", booksController.getAllBooks, (req, res, next) => {
  res.render("bookDelete", { books: req.data });
});
app.delete("/books/:book/delete", booksController.deleteBook);

app.get("/books/:book", booksController.getBook, (req, res, next) => {
  res.render("list", { books: req.data });
});


//port to listen
app.listen(app.get("port"), () => {
  console.log(`Server Running on http://localhost:${app.get("port")}`);
});