const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.listen(5000, () => {
    app.get('/users', (req, res) => {
    const users = [
      {id: 1, name: 'Anand'},
      {id: 2, name: 'Sachin'}
    ];
    res.json(users);
  });
  app.post('/users', (req, res) => {
    const user = req.body;
    // Save the user to the database
    res.json(user);
  });
  console.log('Server started on port 5000');
});







// app.get('/users', (req, res) => {
//     const users = [
//       {id: 1, name: 'John'},
//       {id: 2, name: 'Jane'}
//     ];
//     res.json(users);
//   });
//   app.post('/users', (req, res) => {
//     const user = req.body;
//     // Save the user to the database
//     res.json(user);
//   });
    