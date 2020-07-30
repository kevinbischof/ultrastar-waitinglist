const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const route = 'singer';
const singers = require(`../controllers/${route}.controller`);

// Retrieve all Singers
router.get("/", checkAuth, singers.findAll);

// Retrieve a single Singer with Id
router.get(`/:${route}Id`, checkAuth, singers.findById);

// Create a new Singer
router.post("/", checkAuth, singers.create);

// Update a Singer with Id
router.put(`/:${route}Id`, checkAuth, singers.update);

// Delete a Singer with Id
router.delete(`/:${route}Id`, checkAuth, singers.delete);

module.exports = router;
