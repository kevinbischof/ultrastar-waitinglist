const express = require('express');
const router = express.Router();
const users = require("../controllers/user.controller");
const checkAuth = require('../middleware/check-auth');

// Retrieve all Users
router.get("/", checkAuth, users.findAll);

// Retrieve a single User with userId
router.get("/:userId", checkAuth, users.findById);

// Create a new User
router.post("/", checkAuth, users.create);

// Login
router.post("/login", users.login);

// Update a User with userId
router.put("/:userId", checkAuth, users.update);

// Delete a User with userId
router.delete("/:userId", checkAuth, users.delete);

module.exports = router;
