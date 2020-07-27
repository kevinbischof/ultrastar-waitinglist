const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//TODO: email validation

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // first check if user already exists with email from request
    User.findByEmail(req.body.email, (err, data) => {
        // if an error will be returned, the email is already in db
        if (err) {
            if (err.kind === "found") {
                res.status(409).send({
                    message:
                        err.message || "User with email already exists"
                });
            } else if (err.kind === "not_found") {
                // there is no user with email from request, so hash pw and create the user
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        // Create a User
                        let user = new User({
                            username: req.body.username,
                            lastname: req.body.lastname,
                            firstname: req.body.firstname,
                            email: req.body.email,
                            phone: req.body.phone,
                            address: req.body.address,
                            zip_code: req.body.zip_code,
                            state: req.body.state,
                            password: hash
                        });
                        // Save User in the database
                        User.create(user, (err, data) => {
                            if (err)
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while creating the User."
                                });
                            else res.send(data);
                        });
                    }
                });
            }
        }
    });
};

// Retrieve all Users from the database
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        else res.send(data);
    });
};

// Save in the database
exports.findById = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Find a single with Id
exports.findByEmail = (req, res) => {
    User.findByEmail(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === "found") {
                res.status(409).send({
                    message: `There is already a User with email ${req.params.email}.`
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

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    )
};

// Login
exports.login = (req, res) => {
    User.findByEmail(req.body.email, (err, data) => {
        if (err) {
            // check if user found with email
            if (err.kind === "not_found") {
                res.status(401).send({
                    message: 'Auth failed'
                });
            } else if (err.kind === "found") {
                bcrypt.compare(req.body.password, data.password.toString(), (err, result) => {
                    // if there is an error, send status 401 auth failed
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    // if the comparison is correct, send status 200 auth successful
                    if (result) {
                        const token = jwt.sign({
                                email: data.email,
                                id: data.id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        })
                    }
                    // if the comparison failed, send status 401 auth failed
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                });
            }
        } else res.send(data);
    });
};

// Delete with the specified Id in the request
exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.id
                });
            }
        } else res.send({message: `User was deleted successfully!`});
    });
};
