const getUserInfo = async (db, id) => {
  let user = await db.userCtrl.get_user_info([id])
  console.log('everything hit')
  if (!user[0]) {
    user = await db.userCtrl.get_user_without_connections([id])
    console.log('without connections hit')
  }
  if (!user[0]) {
    user = await db.userCtrl.get_user_without_videos([id])
    console.log('wo vidoes hit')
  }
  if (!user[0]) {
    user = await db.userCtrl.get_user_without_auditions([id])
    console.log('wo auditions hit')
  }
  if (!user[0]) {
    user = await db.userCtrl.get_user_without_theaters([id])
    console.log('wo theaters hit')
  }
  return user
}

module.exports = {
  editUser: async (req, res) => {
    const db = req.app.get('db')

    const { first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range } = req.body

    const { id } = req.session.user

    const [updatedUser] = await db.userCtrl.edit_user([first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range, id])

    res.status(200).send(updatedUser)
  },

  getUserInfo: async (req, res) => {
    // big ol join statement in db to get data to display for users profile.
    const db = req.app.get('db')
    const { id } = req.session.user

    const user = await getUserInfo(db, id)

    // console.log(user)
    res.status(200).send(user)
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