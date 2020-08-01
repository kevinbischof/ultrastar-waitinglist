const sql = require("./db");
const table = 'user';


// constructor
const User = function (user) {
    this.username = user.username;
    this.lastname = user.lastname;
    this.firstname = user.firstname;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.zip_code = user.zip_code;
    this.state = user.state;
    this.password = user.password;
};

User.create = (newObject, result) => {
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

User.findById = (id, result) => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err2, res) => {
            console.log('err2: ', err2)
            console.log('res: ', res)
            if (res) {
                if (res.length) {
                    result(null, res[0]);
                    return;
                }
            }


            // not found with the id
            result({kind: "not_found"}, null);
        });
        connection.release();
    });
};

User.findByEmail = (email, result) => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`SELECT * FROM ${table} WHERE email = ?`, [email], (err2, res) => {
            if (err2) {
                console.log(err2)
            }
            if (res) {
                if (res.length >= 1) {
                    // found User with the email
                    result({kind: "found"}, res[0]);
                    return;
                }
            }

            // not found with the id
            result({kind: "not_found"}, null);
        });
        connection.release();
    });
};

User.getAll = result => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`SELECT * FROM ${table}`, (err2, res) => {
            result(null, res);
        });
        connection.release();
    });
};

User.updateById = (id, object, result) => {
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
                `UPDATE ${table} SET username = ?, lastname = ?, firstname = ?, email = ?, phone = ?, 
                address = ?, zip_code = ?, state = ?, password = ? WHERE id = ?`,
                [object.username, object.lastname, object.firstname, object.email, object.phone,
                    object.address, object.zip_code, object.state, object.password, id],
                (err2, res) => {
                    if (res.affectedRows == 0) {
                        // not found User with the id
                        result({kind: "not_found"}, null);
                        return;
                    }

                    result(null, {id: id, ...object});
                });
        });
        connection.release();
    });
};

User.remove = (id, result) => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err2, res) => {
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

module.exports = User;
