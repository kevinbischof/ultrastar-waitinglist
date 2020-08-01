const Song = require("../models/song.model.js");

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Song
    const song = new Song({
        artist: req.body.artist,
        title: req.body.title,
        language: req.body.language,
        edition: req.body.edition,
        genre: req.body.genre,
        year: req.body.year,
        length: req.body.length
    });

    // Save in the database
    Song.create(song, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Song."
            });
        else res.send(data);
    });
};

// Retrieve all from the database
exports.findAll = (req, res) => {
    if (req.query.term) {
        Song.findByTerm(req.query.term,(err, data) => {
            console.log('entered song.controller Song.findByTerm: ', req.query.term)
            console.log('data: ', data)
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving songs by term."
                });
            else res.send(data);
        });
    } else {
        Song.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving songs."
                });
            else res.send(data);
        });
    }
};

// Find a single with Id
exports.findById = (req, res) => {
    Song.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Song with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Song with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log("req.body: ", req.body);

    Song.updateById(
        req.params.id,
        new Song(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Song with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Song with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    )
};

// Delete a Song // Delete with the specified Id in the request the specified id in the request
exports.delete = (req, res) => {
    Song.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Song with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Song with id " + req.params.id
                });
            }
        } else res.send({message: `Song was deleted successfully!`});
    });
};
