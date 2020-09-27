require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./authController')
const userCtrl = require('./userController')
const theaterCtrl = require('./theatreController')


const app = express()

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
  })
)

/*
PUT YOUR ENDPOINTS HERE CARSON FOR ALL YOUR CONTROLLERS
*/
//userauth endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//theaterauth endpoints
app.post('/auth/registertheater', theaterCtrl.registerTheater)
app.post('/auth/logintheater', theaterCtrl.loginTheater)


//user endpoints
app.put('/api/users/:user_id', userCtrl.editUser)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('What it do DB')
  app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})
