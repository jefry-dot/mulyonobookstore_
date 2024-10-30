const Book = require("./book.model");

const postAbook = async (req, res) => {
    try {
     const newBook = await Book({...req.body});
     await newBook.save();
     res.status(200).send({message: "Book created successfully", book: newBook});
    }catch(error) {
     console.error("Error creating book: ", error);
     res.status(500).send({message: "Error creating book"});
    }
 }

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send(books);
    }catch(error) {
        console.error("Error fetching books ", error);
         res.status(500).send({message: "Error fetching book"});
    }
}

const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book) {
            res.status(404).send({message: "Book not found", book: newBook});//liat ini kalau eror
        }
        res.status(200).send(book);
    }catch(error) {
        console.error("Error book not found ", error);
         res.status(500).send({message: "Error book not found"});
    }
}

const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const UpdateBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!UpdateBook) {
            res.status(404).send({message: "Book is not found", book: newBook});
        }res.status(200).send({
            message: "Book updated successfully",
            book: UpdateBook
        });
    } catch (error) {
        console.error("Error Updating a book ", error);
         res.status(500).send({message: "Error Updating a book"});
    }
}
const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteBook = await Book.findByIdAndDelete(id);
        if(!deleteBook) {
            res.status(404).send({message: "Book is not found", book: newBook});
        }res.status(200).send({
            message: "Book deleted successfully",
            book: deleteBook
        });
    } catch (error) {
        console.error("Error deleting a book ", error);
         res.status(500).send({message: "Error deleting a book"});
    }
}
 module.exports = {
    postAbook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteBook
 }