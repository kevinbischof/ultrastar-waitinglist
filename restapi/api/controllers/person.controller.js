const Person = require("../models/person.model.js");

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Person
    const person = new Person({
        name: req.body.name,
        firstname: req.body.firstname
    });

    // Save in the database
    Person.create(person, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Person."
            });
        else res.send(data);
    });
};

// Retrieve all from the database
exports.findAll = (req, res) => {
    Person.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving persons."
            });
        else res.send(data);
    });
};

// Find a single with Id
exports.findById = (req, res) => {
    Person.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Person with id " + req.params.id
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

    Person.updateById(
        req.params.id,
        new Person(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Person with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Person with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    )
};

// Delete a Person // Delete with the specified Id in the request the specified PersonId in the request
exports.delete = (req, res) => {
    Person.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Person with id " + req.params.id
                });
            }
        } else res.send({message: `Person was deleted successfully!`});
    });
};
