const mysql = require('mysql')
const bcrypt = require('bcrypt')
const saltRounds = 10
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tugas-web"
})

con.connect(function (err) {
    if (err) throw err
})

module.exports = function (req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    const sql = "SELECT * FROM user WHERE username = '" + username + "'"
    con.query(sql, function (err, result) {
        if (err) throw err
        if (result.length < 1)
            res.send(401)
        else {
            bcrypt.compare(password, result[0].password, function (err, resultt) {
                if (resultt == true) {
                    next();
                }
                else {
                    res.send(401)
                }
            });
        }
    })
}