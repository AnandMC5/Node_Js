const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3307;

// Create a MySQL database connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Anandmc*005123',
//   database: 'online_library_management',
// });

const connection = mysql.createConnection({
  host: 'localhost:3307',
  user: 'root',
  password: 'Anandmc*005123',
  database: 'online_library_management',
  port: 3307 // change the port number to 3307 or any other available port number
});


// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database...');
});

// Use body-parser middleware to parse request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define API endpoints
app.get('/authors', (req, res) => {
  connection.query(`SELECT * FROM authors;`, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Error retrieving authors from database');
      return;
    }
    res.json(results);
  });
});

app.get('/books', (req, res) => {
  connection.query('SELECT * FROM online_library_management.books', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Error retrieving books from database');
      return;
    }
    res.json(results);
  });
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM online_library_management.users', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Error retrieving users from database');
      return;
    }
    res.json(results);
  });
});

app.get('/borrowed_books', (req, res) => {
  connection.query('SELECT * FROM online_library_management.borrowed_books', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Error retrieving borrowed books from database');
      return;
    }
    res.json(results);
  });
});

app.post('/borrowed_books', (req, res) => {
  const { book_id, user_id, borrowed_date, due_date } = req.body;
  connection.query(
    'INSERT INTO borrowed_books (book_id, user_id, borrowed_date, due_date) VALUES (?, ?, ?, ?)',
    [book_id, user_id, borrowed_date, due_date],
    (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ', err);
        res.status(500).send('Error borrowing book from database');
        return;
      }
      res.json(results);
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

connection.end((err) => {
  if (err) throw err;
  console.log('Connection to MySQL database ended!');
});