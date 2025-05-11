const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (users[username]) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users[username] = { username, password };

  return res.status(201).json({ message: "User registered successfully" });
});



public_users.get('/isbn/:isbn', function (req, res) {
  const { isbn } = req.params; 
  
  const book = Object.values(books).find(b => b.isbn === isbn);
  
  if (book) {
    return res.json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

  

public_users.get('/author/:author', function (req, res) {
  const { author } = req.params; 

  const booksByAuthor = Object.values(books).filter(b => b.author.toLowerCase().includes(author.toLowerCase()));

  if (booksByAuthor.length > 0) {
    return res.json(booksByAuthor);
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
});


public_users.get('/title/:title', function (req, res) {
  const { title } = req.params; 

  const booksByTitle = Object.values(books).filter(b => b.title.toLowerCase().includes(title.toLowerCase()));

  if (booksByTitle.length > 0) {
    return res.json(booksByTitle);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});


public_users.get('/review/:isbn', function (req, res) {
  const { isbn } = req.params; 

  const book = books[isbn];

  if (book) {
    if (Object.keys(book.reviews).length > 0) {
      return res.json(book.reviews);
    } else {
      return res.status(404).json({ message: "No reviews available for this book" });
    }
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});



module.exports.general = public_users;
