const express = require('express');
const bodyParser = require("body-parser");

const personRoutes = require('./api/routes/person.routes');
const userRoutes = require('./api/routes/user.routes');

const app = express();
const morgan = require('morgan');

// Incoming requests must pass app.use() function

// request log
app.use(morgan('dev'));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// CORS handling. Needs to be before call of routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/persons', personRoutes);
app.use('/users', userRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
   res.status(error.status ||500);
   res.json({
       error: {
           message: error.message
       }
   });
});

module.exports = app;
