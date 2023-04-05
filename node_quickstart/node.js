const { MongoClient } = require('mongodb');

// Replace the connection string with your own
const uri = 'mongodb+srv://anandmc234:yLeYmqjglPXiz8Fx@demo1.xcjwlva.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    // Do something with the database
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
