const mongoose = require("mongoose");

const Book = mongoose.model("Book", {
    name: String,
    writer: String,
    categories: [String],
    price: Number,
});

module.exports = Book;
