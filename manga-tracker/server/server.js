require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const {PORT, SESSION_SECRET} = process.env

app.use(express.json())

app.use(cors(
    {
    origin: ["http://localhost:4004"],
    methods: ["GET", "POST"],
    credentials: true
}
))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    key: "userId",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))

app.use(express.static("public"))

const controllerFile = require('./controller.js')

// app.get("/list", (req, res) => {
//     res.json({ message: "Hello from Express!" });
//   });


app.post('/register', controllerFile.addUser)
app.get('/login', controllerFile.checkLogin)
app.post(`/login`, controllerFile.userLogin)
app.post('/addAnime', controllerFile.addAnime)
app.post('/getAnime', controllerFile.getAnime)

app.listen(PORT, () => console.log(`up on ${PORT}`))