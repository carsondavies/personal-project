const bcrypt = require('bcryptjs')

module.exports = {
  registerTheater: async (req, res) => {
    const db = req.app.get('db')

    const { theater_name, email, password } = req.body

    const [theater] = await db.authentication.check_theater([theater_name, email])

    if (theater) {
      return res.status(409).send('Theater already registered')
    }

    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(password, salt)

    const [newTheater] = await db.authentication.register_theater([theater_name, email, hash])

    req.session.user = newTheater

    res.status(200).send(req.session.user)
  },

  loginTheater: async (req, res) => {
    const db = req.app.get('db')

    const { email, password } = req.body

    const [existingTheater] = await db.authentication.check_theater_login([email])

    if (!existingTheater) {
      return res.status(404).send('Theater not found')
    }

    const isAuthenticated = bcrypt.compareSync(password, existingTheater.password_hash)

    if (!isAuthenticated) {
      return res.status(403).send('Incorrect email or password')
    }

    delete existingTheater.password_hash

    req.session.user = existingTheater

    res.status(200).send(req.session.user)
  },

  logoutTheater: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  getTheater: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('No session found')
    }
  }
}