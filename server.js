require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI); // debug to see if loaded


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/main'); // points to main.ejs
app.set('view engine', 'ejs');

app.use('/', require('./routes/main'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


