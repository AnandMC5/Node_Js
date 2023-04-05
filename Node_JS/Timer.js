//Using callbacks and asynchronous programming:
//Node.js is designed to be non-blocking and asynchronous, which means that it can handle many requests and operations simultaneously without blocking the event loop. As a result, many Node.js functions use callback functions to handle the results of asynchronous operations. 
//Here's an example code snippet that demonstrates this:

function fetchUserData(userId, callback) {
    // simulate fetching user data from a database
    setTimeout(() => {
      const userData = { id: userId, name: 'John Doe', email: 'john.doe@example.com' };
      callback(userData);
    }, 5000);
  }
  
  fetchUserData(123, (userData) => {
    console.log(userData);
  });
  
  