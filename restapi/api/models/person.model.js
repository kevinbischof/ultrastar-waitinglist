const sql = require("./db");
const table = 'person';

// constructor
const Person = function (object) {
    this.name = object.name;
    this.firstname = object.firstname;
};

Person.create = (newObject, result) => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`INSERT INTO ${table} SET ?`, newObject, (err2, res) => {
            if (err2) {
                console.log("err2: ", err2);
                result(err2, null);
                return;
            }
            result(null, {id: res.insertId, ...newObject});
        });
        connection.release();
    });
};

Person.findById = (id, result) => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err2, res) => {
            console.log(res);
            if (res != undefined) {
                if (res.length) {
                    console.log("found person: ", res[0]);
                    result(null, res[0]);
                    return;
                }
            } else {
                result({kind: "not_found"}, null);
            }


            // not found with the id
            result({kind: "not_found"}, null);
        });
        connection.release();
    });
};

Person.getAll = result => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`SELECT * FROM ${table}`, (err2, res) => {
            console.log("persons: ", res);
            result(null, res);
        });
        connection.release();
    });
};

Person.updateById = (id, object, result) => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err1, res1) => {
            if (res1.length) {
                for (var attrname in object) {
                    if (object[attrname] == undefined) {
                        object[attrname] = res1[0][attrname];
                    }
                }
            }
            connection.query(
                `UPDATE ${table} SET name = ?, firstname = ? WHERE id = ?`,
                [object.name, object.firstname, id],
                (err2, res) => {
                    if (res.affectedRows == 0) {
                        // not found Person with the id
                        result({kind: "not_found"}, null);
                        return;
                    }

                    result(null, {id: id, ...object});
                });
        });
        connection.release();
    });
};

Person.remove = (id, result) => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err2, res) => {
            console.log(res);
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found with the id
                result({kind: "not_found"}, null);
                return;
            }

            result(null, res);
        });
        connection.release();
    });
};

module.exports = Person;
