const mysql = require('mysql')
const express = require('express')
const router = express.Router();
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tugas-web"
})

con.connect(function (err) {
    if (err) throw err
})

router.get('/user', function (req, res) {
    const sql = "SELECT * FROM user"
    con.query(sql, function (err, result) {
        if (err) throw err
        // res.send(result.map(item => "<div>" + item.task + "</div>").join(""))
        res.send(result)
    })
})

router.post('/user', function (req, res) {
    console.log(req.body)
    const sql = "INSERT INTO user(username, password) VALUES ('" + req.body.username + "' , '" + req.body.password + "')"
    con.query(sql, function (err) {
        if (err) throw err
        console.log("1 record inserted")
    })
    res.end()
})

router.delete('/user/:id', function (req, res) {
    console.log(req.body)
    const sql = "DELETE FROM user WHERE id = " + req.params.id
    con.query(sql, function (err) {
        if (err) throw err
        console.log("1 record deleted")
    })
    res.end()
})

module.exports = router