const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books-controller");

router.get("/", bookController.AllBooks);

router.post("/add", bookController.AddBooks);

router.get("/:bookId", bookController.FilterBook);

router.put("/update/:id", bookController.UpdateBook);

router.delete("/delete/:id", bookController.DeleteBook);

module.exports = router; //module exports goes to the router
