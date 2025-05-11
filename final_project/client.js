const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// ------------------------
// Task 10: Get all books
// Using async/await
// ------------------------
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("All books:", response.data);
  } catch (err) {
    console.error("Error getting all books:", err.message);
  }
}

// ------------------------
// Task 11: Get book by ISBN
// Using Promises
// ------------------------
function getBookByISBN(isbn) {
  axios
    .get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => {
      console.log(`Book with ISBN ${isbn}:`, response.data);
    })
    .catch(err => {
      console.error(`Error getting book by ISBN ${isbn}:`, err.response?.data || err.message);
    });
}

// ------------------------
// Task 12: Get books by Author
// Using Promises
// ------------------------
function getBooksByAuthor(author) {
  axios
    .get(`${BASE_URL}/author/${encodeURIComponent(author)}`)
    .then(response => {
      console.log(`Books by author "${author}":`, response.data);
    })
    .catch(err => {
      console.error(`Error getting books by author "${author}":`, err.response?.data || err.message);
    });
}

// ------------------------
// Task 13: Get books by Title
// Using Promises
// ------------------------
function getBooksByTitle(title) {
  axios
    .get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
    .then(response => {
      console.log(`Books with title "${title}":`, response.data);
    })
    .catch(err => {
      console.error(`Error getting books with title "${title}":`, err.response?.data || err.message);
    });
}

async function runAll() {

  await getAllBooks();

  getBookByISBN("1");                 

  getBooksByAuthor("Chinua Achebe"); 

  getBooksByTitle("Things Fall Apart"); 
}

runAll();
