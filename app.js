/*
Title: Main Application Entry
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Express app setup with EJS, Bootstrap, dotenv, and SQLite
*/

require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // default layout file

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.admin = req.session.admin;
    next();
});

// Routes
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

app.use('/admin', adminRoutes);
app.use('/', publicRoutes);

// Redirect root to job list (optional, if not already handled in publicRoutes)
app.get('/', (req, res) => {
    res.redirect('/jobs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
