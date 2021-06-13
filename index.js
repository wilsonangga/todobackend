const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routerTodo = require('./routers/todo.js')
const routerUser = require('./routers/users.js')
const auth = require('./middleware/auth.js')

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

app.use('/todo', auth, routerTodo)
app.use('/user', routerUser)

app.listen(3000)





