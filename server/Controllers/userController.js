// const getUserInfo = require('../utils/getAllUserInfo')
const getAllAuditions = require('../utils/getAllAuditions')
const getAllVideos = require('../utils/getAllVideos')
const getAllTheaters = require('../utils/getAllTheaters')

module.exports = {
  getAllAuditions: async (req, res) => {
    const db = req.app.get('db')
    const auditions = await getAllAuditions(db)
    res.status(200).send(auditions)
  },

  getAllVideos: async (req, res) => {
    const db = req.app.get('db')
    const videos = await getAllVideos(db)
    res.status(200).send(videos)
  },

  getAllTheaters: async (req, res) => {
    const db = req.app.get('db')
    const theaters = await getAllTheaters(db)
    res.status(200).send(theaters)
  },

  getUserInfo: async (req, res) => {
    // big ol join statement in db to get data to display for users profile.
    const db = req.app.get('db')
    const { id } = req.session.user

    // const user = await getUserInfo(db, id)

    const [user] = await db.get_user_info(id)

    // console.log(user)
    res.status(200).send(user)
  },

  editUser: async (req, res) => {
    const db = req.app.get('db')

    const { first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range } = req.body

    const { id } = req.session.user

    const [updatedUser] = await db.userCtrl.edit_user([first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range, id])

    res.status(200).send(updatedUser)
  },

  getUserVideos: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user

    const [userVideos] = await db.get_user_videos(id)

    res.status(200).send(userVideos)
  },

  getUserAuditions: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user

    const [userAuditions] = await db.get_user_auditions(id)

    res.status(200).send(userAuditions)
  },

  getUserTheaters: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user

    const [userTheaters] = await db.get_user_theaters(id)

    res.status(200).send(userTheaters)
  },



  connectVideo: async (req, res) => {
    //makes DB connection via foreign string to their userid (INSERT AND JOIN)
    console.log('hit connect video')
    const db = req.app.get('db')

    const { id } = req.session.user
    const { video_id } = req.params

    let result = await db.userCtrl.connect_video([id, video_id])

    // const user = await getUserInfo(db, id)

    res.status(200).send(result)
  },

  disconnectVideo: async (req, res) => {
    //deletes foreign key connection in DB.
    const db = req.app.get('db')

    const { id } = req.session.user
    const { video_id } = req.params

    let result = await db.userCtrl.disconnect_video([id, video_id])

    // let user = await getUserInfo(db, id)

    res.status(200).send(result)
  },

  connectTheater: async (req, res) => {
    //makes db connection to specific theater (connections table)
    const db = req.app.get('db')

    const { id } = req.session.user
    const { theater_id } = req.params

    let result = await db.userCtrl.connect_theater([id, theater_id])

    // let user = await getUserInfo(db, id)

    res.status(200).send(result)
  },


  disconnectTheater: async (req, res) => {
    const db = req.app.get('db')

    const { id } = req.session.user
    const { theater_id } = req.params

    let result = await db.userCtrl.disconnect_theater([id, theater_id])

    // let user = getUserInfo(db, id)

    res.status(200).send(result)
  },

  connectAudition: async (req, res) => {
    //makes makes foreign key connection to audiitions table in db.
    const db = req.app.get('db')

    const { id } = req.session.user
    const { audition_id, theater_id } = req.params

    let result = await db.userCtrl.connect_audition([id, audition_id, theater_id])

    // let user = await getUserInfo(db, id)

    res.status(200).send(result)
  },

  disconnectAudition: async (req, res) => {
    const db = req.app.get('db')

    const { id } = req.session.user
    const { theater_id } = req.params

    let result = await db.userCtrl.disconnect_audition([id, theater_id])

    // let user = getUserInfo(db, id)

    res.status(200).send(result)
  }
}