//Demo Example: Define a function that takes two numbers and a callback function in Node JS

//In the given example, we defined a function called addNumbers that takes two numbers and a callback function as arguments. 
//The addNumbers function performs the addition operation and then calls the callback function with the result as an argument.
//We then called the addNumbers function with two numbers and a callback function. 
//The callback function is executed after the addition operation is completed, and it prints the result to the console.
//This is just a basic example of how callbacks work in Node.js. 
//Note: callbacks are used extensively in Node.js to perform various asynchronous operations such as reading and writing files, 
//making API calls, and interacting with databases.

const http = require('http');

const hostname = 'localhost';
const port = 5000;

function addNumbers(num1, num2, callback) {
  // Perform the addition operation
  let sum = num1 + num2;

  // Call the callback function with the sum as an argument
  callback(sum);
}

const server = http.createServer((req, res) => {
  // Call the addNumbers function with two numbers and a callback function
  addNumbers(100, 130, function(result) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`The result is: ${result}`);
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


