

module.exports = {
  editUser: async (req, res) => {
    const db = req.app.get('db')

    const { first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range } = req.body

    const { id } = req.session.user

    const [updatedUser] = await db.edit_user([first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range, id])

    res.status(200).send(updatedUser)
  },

  getUserInfo: async (req, res) => {
    // big ol join statement in db to get data to display for users profile.
    const db = req.app.get('db')

    const { id } = req.session.user

    const [user] = await db.get_user_info([id])

    res.status(200).send(user)
  },


  connectVideo: async (req, res) => {
    //makes DB connection via foreign string to their userid (INSERT AND JOIN)

  },

  disconnectVideo: async (req, res) => {
    //deletes foreign key connection in DB.
  },

  connectTheater: async (req, res) => {
    //makes db connection to specific theater (connections table)
  },

  disconnectTheater: async (req, res) => {

  },

  connectAudition: async (req, res) => {
    //makes makes foreign key connection to audiitions table in db.
  },

  disconnectAudition: async (req, res) => { }
}