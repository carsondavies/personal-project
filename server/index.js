require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./authController')
const userCtrl = require('./userController')
const theaterCtrl = require('./theaterController')
const resourceCtrl = require('./resourceController')
const auditionCtrl = require('./auditionController')


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
app.delete('/auth/logouttheater', theaterCtrl.logoutTheater)
app.get('/auth/theater', theaterCtrl.getTheater)

//audition endpoints
app.get('/api/auditions', auditionCtrl.getAuditions)
app.post('/api/auditions', /*middleware to verify theater */ auditionCtrl.addAudition)
app.put('/api/auditions/:audition_id', /*middleware to verify theater */ auditionCtrl.editAudition)
app.delete('/api/auditions/:audition_id', /*middleware to verify theater */ auditionCtrl.deleteAudition)

//adding video endpoints
app.post('/api/videos/bass', resourceCtrl.addVideoToBass)
app.post('/api/videos/tenor', resourceCtrl.addVideoToTenor)
app.post('/api/videos/alto', resourceCtrl.addVideoToAlto)
app.post('/api/videos/soprano', resourceCtrl.addVideoToSoprano)

//user endpoints
app.put('/api/users', userCtrl.editUser)
app.get('/api/users', userCtrl.getUserInfo)
app.post('/api/users/:video_id', userCtrl.connectVideo)
app.delete('/api/users/:video_id', userCtrl.disconnectVideo)
app.post('/api/users/theaters/:theater_id', userCtrl.connectTheater)
app.delete('/api/users/theaters/:theater_id', userCtrl.disconnectTheater)
app.post('/api/users/:audition_id/:theater_id', userCtrl.connectAudition)
app.delete('/api/users/:theater_id', userCtrl.disconnectAudition)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('What it do DB')
  app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})
