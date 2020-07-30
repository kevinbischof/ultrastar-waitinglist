const Singer = require("../models/singer.model.js");

// Create and Save
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Singer
    const singer = new Singer({
        name: req.body.name,
        song_id: req.body.song_id,
        waitinglist_id: req.body.waitinglist_id,
    });

    // Save in the database
    Singer.create(singer, (err, data) => {
        console.log(data)
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Singer."
            });
        else res.send(data);
    });
};

// Retrieve all from the database
exports.findAll = (req, res) => {
    Singer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving singers."
            });
        else res.send(data);
    });
};

// Find a single with Id
exports.findById = (req, res) => {
    Singer.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Singer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Singer with id " + req.params.id
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

    Singer.updateById(
        req.params.id,
        new Singer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Singer with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Singer with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    )
};

// Delete a Singer // Delete with the specified Id in the request the specified id in the request
exports.delete = (req, res) => {
    Singer.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Singer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Singer with id " + req.params.id
                });
            }
        } else res.send({message: `Singer was deleted successfully!`});
    });
};
