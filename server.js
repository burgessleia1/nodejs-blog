require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI); // debug to see if loaded

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');  // <-- add this line
const connectDB = require('./config/db');

connectDB();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// --------------------------
// Session middleware here
app.use(
  session({
    secret: 'yourSecretKey', // replace with a secure key
    resave: false,
    saveUninitialized: false
  })
);
// --------------------------

app.use('/', require('./routes/main'));
app.use('/admin', require('./routes/admin')); // make sure you add this for admin routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


