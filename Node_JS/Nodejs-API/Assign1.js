const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());

// connect to database
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Could not connect to database', err));

// define schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

// define model
const Product = mongoose.model('Product', productSchema);

// create a new product
app.post('/products', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get a single product
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update a product
app.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));
