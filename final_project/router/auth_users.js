const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js');

const regd_users = express.Router();
let users = [];

const JWT_SECRET = 'fingerprint_customer';

const isValid = (username) => {
  return users.some(u => u.username === username);
};

const authenticatedUser = (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  return !!user;
};

regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (isValid(username)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  req.session.authorization = { accessToken: token };
  return res.json({ message: "Login successful", token });
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  console.log("BODY:", req.body);
  const { isbn } = req.params;
  const { review } = req.body;       
  const { username } = req.user;     

  if (!review) {
    return res.status(400).json({ message: "Review is required" });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[username] = review;
  return res.json({ message: "Review added/updated successfully" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { username } = req.user;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!books[isbn].reviews[username]) {
    return res.status(403).json({ message: "You can only delete your own reviews" });
  }

  delete books[isbn].reviews[username];
  return res.json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;
module.exports.JWTSec = JWT_SECRET;     