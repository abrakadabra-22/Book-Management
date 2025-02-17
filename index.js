const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample in-memory database
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];



// Get all books
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// Get a single book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Create a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update an existing book by ID
app.put('/api/books/:id', (req, res) => {
  const { title, author } = req.body;
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});

// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Book management API is running on http://localhost:${port}`);
});
