const Waitinglist = require("../models/waitinglist.model.js");

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Waitinglist
    const waitinglist = new Waitinglist({
        singer_id: req.body.singer_id
    });

    // Save in the database
    Waitinglist.create(waitinglist, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Waitinglist."
            });
        else res.send(data);
    });
};

// Retrieve all from the database
exports.findAll = (req, res) => {
        Waitinglist.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving songs."
                });
            else res.send(data);
        });
};

// Find a single with Id
exports.findById = (req, res) => {
    Waitinglist.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Song with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Waitinglist with id " + req.params.id
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

    Waitinglist.updateById(
        req.params.id,
        new Waitinglist(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Song with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Waitinglist with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    )
};

// Delete a Waitinglist // Delete with the specified Id in the request the specified id in the request
exports.delete = (req, res) => {
    Waitinglist.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Song with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Waitinglist with id " + req.params.id
                });
            }
        } else res.send({message: `Song was deleted successfully!`});
    });
};
