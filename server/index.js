require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./Controllers/authController')
const userCtrl = require('./Controllers/userController')
const theaterCtrl = require('./Controllers/theaterController')
const resourceCtrl = require('./Controllers/resourceController')
const verifyUser = require('./middlewares/verifyUser')
const verifyTheater = require('./middlewares/verifyTheater')


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
//userauth endpoints still needs nodemailer
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)
app.post('/auth/registertheater', authCtrl.registerTheater)
app.post('/auth/logintheater', authCtrl.loginTheater)
app.delete('/auth/logouttheater', authCtrl.logoutTheater)
app.get('/auth/theater', authCtrl.getTheater)
app.post('/api/email', authCtrl.email)

//adding video endpoints
app.post('/api/videos/bass', verifyUser, resourceCtrl.addVideoToBass)
app.post('/api/videos/tenor', verifyUser, resourceCtrl.addVideoToTenor)
app.post('/api/videos/alto', verifyUser, resourceCtrl.addVideoToAlto)
app.post('/api/videos/soprano', verifyUser, resourceCtrl.addVideoToSoprano)


//audition endpoints only accessible to verified theaters
app.put('/api/theaters', verifyTheater, theaterCtrl.editTheaterInfo)
app.get('/api/theaterauditions/:theater_id', verifyTheater, theaterCtrl.getTheaterAuditions)
app.post('/api/postaudition', verifyTheater, theaterCtrl.addAudition)
app.put('/api/auditions/:audition_id', verifyTheater, theaterCtrl.editAudition)
app.delete('/api/auditions/:audition_id', verifyTheater, theaterCtrl.deleteAudition)


//user endpoints
app.get('/api/videos', userCtrl.getAllVideos)
app.get('/api/auditions', userCtrl.getAllAuditions)
app.get('/api/theaters', userCtrl.getAllTheaters)


app.put('/api/users', userCtrl.editUser)
app.get('/api/users/userinfo', userCtrl.getUserInfo)
app.get('/api/users/uservideos', userCtrl.getUserVideos)
app.get('/api/users/userauditions', userCtrl.getUserAuditions)
app.get('/api/users/usertheaters', userCtrl.getUserTheaters)

app.post('/api/users/:video_id', userCtrl.connectVideo)
app.delete('/api/users/:video_id', userCtrl.disconnectVideo)
app.post('/api/users/theaters/:theater_id', userCtrl.connectTheater)
app.delete('/api/users/theaters/:theater_id', userCtrl.disconnectTheater)
app.post('/api/users/:audition_id/:theater_id', userCtrl.connectAudition)
app.delete('/api/users/:theater_id/:audition_id', userCtrl.disconnectAudition)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('What it do DB')
  app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})
