const express = require('express');
const router = express.Router();
const Book = require('../books/book.model');
const { postAbook, getAllBooks, getSingleBook, UpdateBook, deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');


router.post("/create-book", verifyAdminToken, postAbook)
// get all books

router.get("/", getAllBooks );

router.get("/:id", getSingleBook);

router.put("/edit/:id", verifyAdminToken, UpdateBook);

router.delete("/:id", verifyAdminToken, deleteBook)

module.exports = router;