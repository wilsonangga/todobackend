const mysql = require('mysql')
const express = require('express')
const auth = require('../middleware/auth.js')
const router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 5
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tugas-web"
})

con.connect(function (err) {
    if (err) throw err
})

router.get('/', auth, function (req, res) {
    const sql = "SELECT * FROM user"
    con.query(sql, function (err, result) {
        if (err) throw err
        // res.send(result.map(item => "<div>" + item.task + "</div>").join(""))
        res.send(result)
    })
})

router.post('/', function (req, res, next) {
    const sql = "SELECT * FROM user"
    con.query(sql, function (err, result) {
        if (result.length > 0) {
            auth(req, res, next)
        } else {
            next()
        }
    })
}, function (req, res) {
    const check = "SELECT * FROM user WHERE username = '" + req.body.username + "'"
    con.query(check, function (err, result) {
        if (result.length > 0) {
            // res.send("Username sudah ada")
            return
        } else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    const sql = "INSERT INTO user(username, password) VALUES ('" + req.body.username + "' , '" + hash + "')"
                    con.query(sql, function (err) {
                        if (err) throw err
                        console.log("1 record inserted")
                    })
                })
            })
        }
    })
    res.end()
})

router.delete('/:id', auth, function (req, res) {
    const check = "SELECT * FROM user"
    con.query(check, function (err, result) {
        if (result.length == 1)
            return
        else {
            const sql = "DELETE FROM user WHERE id = " + req.params.id
            con.query(sql, function (err) {
                if (err) throw err
                console.log("1 record deleted")
            })
        }
    })
    res.end()
})

module.exports = router