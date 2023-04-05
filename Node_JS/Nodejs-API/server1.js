const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');

const app = express();

const db = new sqlite3.Database('todos.db');

// Create the 'todos' table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse incoming JSON data
app.use(express.json());

// Render the TODO list
app.get('/', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('index', { todos: rows });
    }
  });
});

// Add a new task
app.post('/add', (req, res) => {
  const task = req.body.task;
  if (!task) {
    res.status(400).send('Missing task parameter');
  } else {
    db.run('INSERT INTO todos (task) VALUES (?)', [task], (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.redirect('/');
      }
    });
  }
});

// Delete a task
app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect('/');
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
