require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Seed function
const seedPosts = async () => {
  try {
    // Clear existing posts
    await Post.deleteMany();

    // Sample posts
    const posts = [
      { title: 'My First Post', body: 'This is the content of my first post.' },
      { title: 'Another Post', body: 'Here is some more content.' },
      { title: 'Last Post', body: 'Final example post.' }
    ];

    // Insert posts
    await Post.insertMany(posts);
    console.log('Sample posts added!');

    // Close connection
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedPosts();
