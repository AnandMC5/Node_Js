// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const todos = [];

// function printTodos() {
//   console.log('--- Todo List ---');
//   for (let i = 0; i < todos.length; i++) {
//     console.log(`${i + 1}. ${todos[i]}`);
//   }
// }

// function addTodo() {
//   rl.question('Enter todo: ', (todo) => {
//     todos.push(todo);
//     console.log(`Added "${todo}" to the list.`);
//     printTodos();
//     promptUser();
//   });
// }

// function removeTodo() {
//   rl.question('Enter index of todo to remove: ', (indexStr) => {
//     const index = parseInt(indexStr) - 1;
//     if (index >= 0 && index < todos.length) {
//       const removedTodo = todos.splice(index, 1)[0];
//       console.log(`Removed "${removedTodo}" from the list.`);
//     } else {
//       console.log('Invalid index.');
//     }
//     printTodos();
//     promptUser();
//   });
// }

// function promptUser() {
//   rl.question('Enter command (add, remove, quit): ', (command) => {
//     switch (command) {
//       case 'add':
//         addTodo();
//         break;
//       case 'remove':
//         removeTodo();
//         break;
//       case 'quit':
//         rl.close();
//         break;
//       default:
//         console.log('Invalid command.');
//         promptUser();
//         break;
//     }
//   });
// }

// promptUser();

// const express = require('express');
// const app = express();

// const todos = [];

// app.get('/', (req, res) => {
//   let html = '<html><body>';
//   html += '<h1>Todo List</h1>';
//   html += '<ul>';
//   for (let i = 0; i < todos.length; i++) {
//     html += `<li>${todos[i]}</li>`;
//   }
//   html += '</ul>';
//   html += '<form method="post" action="/add">';
//   html += '<input type="text" name="todo">';
//   html += '<input type="submit" value="Add">';
//   html += '</form>';
//   html += '</body></html>';
//   res.send(html);
// });

// app.post('/add', express.urlencoded({ extended: false }), (req, res) => {
//   const todo = req.body.todo;
//   todos.push(todo);
//   res.redirect('/');
// });

// app.listen(3008, () => {
//   console.log('Todo list server listening on port 3008.');
// });


const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const todos = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body.todo;
  todos.push(todo);
  res.json({ message: `Added "${todo}" to the list.` });
});

app.delete('/todos/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < todos.length) {
    const removedTodo = todos.splice(index, 1)[0];
    res.json({ message: `Removed "${removedTodo}" from the list.` });
  } else {
    res.status(400).json({ message: 'Invalid index.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
