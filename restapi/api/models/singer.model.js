const sql = require("./db");
const table = 'singer';

// constructor
const Singer = function (object) {
    this.name = object.name;
    this.song_id = object.song_id;
    this.waitinglist_id = object.waitinglist_id;
};

Singer.create = (newObject, result) => {
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

Singer.findById = (id, result) => {
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
                    console.log("found singer: ", res[0]);
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

Singer.getAll = result => {
    sql.getConnection(function (err, connection) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        connection.query(`SELECT * FROM ${table}`, (err2, res) => {
            console.log("singers: ", res);
            result(null, res);
        });
        connection.release();
    });
};

Singer.updateById = (id, object, result) => {
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
                `UPDATE ${table} SET name = ?, song_id = ?, waitinglist_id = ? WHERE id = ?`,
                [object.name, object.song_id, object.waitinglist_id, id],
                (err2, res) => {
                    if (res.affectedRows == 0) {
                        // not found Singer with the id
                        result({kind: "not_found"}, null);
                        return;
                    }

                    result(null, {id: id, ...object});
                });
        });
        connection.release();
    });
};

Singer.remove = (id, result) => {
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

module.exports = Singer;
