const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }
  if (!books) {
    return res.status(404).json({ message: "No products found" });
  } else {
    return res.status(200).json({ books: books });
  }
};

const filterAbook = async (req, res, next) => {
  const id = req.params.bookId;
  let book;
  try {
    book = await Book.findById(id); //find a single document by its id
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No products found" });
  } else {
    return res.status(200).json({ book: book });
  }
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(
      id,
      {
        name,
        author,
        description,
        available,
      },
      { new: true }
    );
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: `Unable to update by this ${id}` });
  } else {
    return res.status(200).json({ book: book });
  }
};

const addBook = async (req, res, next) => {
  //destructure req.body object
  const { name, author, description, price, available } = req.body;
  let book;
  try {
    //will contain a new instance of book shema we built
    book = new Book({
      //name:req.body.name
      //req.body is the main funtion and it contains the key value pairs of the data which is submitted in the request body ,
      //by default it is undifined and it is populated when we use it
      //it will allow us to access the data in the strings/json objects
      name,
      author,
      description,
      price,
      available,
    });

    await book.save();
    console.log(book);
  } catch (err) {
    return res.json(err);
  }
  if (!book) {
    return res.status(500).json({ message: "Unable to Add" });
  }
  return res.status(201).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id); //find a single document by its id
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Book is not deleted" });
  } else {
    return res.status(200).json({ message: "Book is deleted successfully" });
  }
};
exports.AllBooks = getAllBooks;

exports.AddBooks = addBook;

exports.FilterBook = filterAbook;

exports.UpdateBook = updateBook;

exports.DeleteBook = deleteBook;
