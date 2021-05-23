const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routerTodo = require('./routers/todo.js')
const routerUser = require('./routers/users.js')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const corsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(jsonParser)
app.use(urlencodedParser)
app.use(cors(corsOptions))

app.use(routerTodo)
app.use(routerUser)

app.listen(3000)





