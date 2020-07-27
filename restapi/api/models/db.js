const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

module.exports = pool;
