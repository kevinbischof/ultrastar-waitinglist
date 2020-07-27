const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const route = 'person';
const persons = require(`../controllers/${route}.controller`);

// Retrieve all Persons
router.get("/", checkAuth, persons.findAll);

// Retrieve a single Person with personId
router.get(`/:${route}Id`, checkAuth, persons.findById);

// Create a new Person
router.post("/", checkAuth, persons.create);

// Update a Person with personId
router.put(`/:${route}Id`, checkAuth, persons.update);

// Delete a Person with personId
router.delete(`/:${route}Id`, checkAuth, persons.delete);

module.exports = router;
