const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const route = 'waitinglist';
const waitinglist = require(`../controllers/${route}.controller`);

// Retrieve all Waitinglists
router.get("/", checkAuth, waitinglist.findAll);

// Retrieve a single Waitinglist with Id
router.get(`/:${route}Id`, checkAuth, waitinglist.findById);

// Create a new Waitinglist
router.post("/", checkAuth, waitinglist.create);

// Update a Waitinglist with Id
router.put(`/:${route}Id`, checkAuth, waitinglist.update);

// Delete a Waitinglist with Id
router.delete(`/:${route}Id`, checkAuth, waitinglist.delete);

module.exports = router;
