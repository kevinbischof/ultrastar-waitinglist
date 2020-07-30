const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const route = 'song';
const songs = require(`../controllers/${route}.controller`);

// Retrieve all Songs
router.get("/", checkAuth, songs.findAll);

// Retrieve a single Song with Id
router.get(`/:${route}Id`, checkAuth, songs.findById);

// Create a new Song
router.post("/", checkAuth, songs.create);

// Update a Song with Id
router.put(`/:${route}Id`, checkAuth, songs.update);

// Delete a Song with Id
router.delete(`/:${route}Id`, checkAuth, songs.delete);

module.exports = router;
