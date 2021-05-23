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

router.get('/', function (req, res) {
    res.send('<form method="post" action="/todo"><input id="task" name="task" style="margin-right:10px;"><input type="submit"></form>')
})

router.post('/todo', function (req, res) {
    console.log(req.body)
    const sql = "INSERT INTO task(task) VALUES('" + req.body.task + "')"
    con.query(sql, function (err) {
        if (err) throw err
        console.log("1 record inserted")
    })
    res.end()
})

router.delete('/todo/:id', function (req, res) {
    const sql = "DELETE FROM task WHERE id = " + req.params.id
    con.query(sql, function (err) {
        if (err) throw err
        console.log("1 record deleted")
    })
    res.end()
})

router.get('/todo', function (req, res) {
    const sql = "SELECT * FROM task"
    con.query(sql, function (err, result) {
        if (err) throw err
        // res.send(result.map(item => "<div>" + item.task + "</div>").join(""))
        res.send(result)
    })
})

module.exports = router