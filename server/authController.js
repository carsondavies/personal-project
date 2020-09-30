const bcrypt = require('bcryptjs')

module.exports = {

  register: async (req, res) => {
    const db = req.app.get('db')

    const { first_name, last_name, email, password } = req.body

    const [user] = await db.authentication.check_user([email])

    if (user) {
      return res.status(409).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(password, salt)

    const [newUser] = await db.authentication.register_user([first_name, last_name, email, hash])

    // await db.store_hash([newUser.id, hash])

    req.session.user = newUser

    res.status(200).send(req.session.user)
  },

  login: async (req, res) => {
    const db = req.app.get('db')

    const { email, password } = req.body

    const [existingUser] = await db.authentication.check_user_login([email])

    if (!existingUser) {
      return res.status(404).send('User not found')
    }

    const isAuthenticated = bcrypt.compareSync(password, existingUser.password_hash)

    if (!isAuthenticated) {
      return res.status(403).send('Incorrect email or password')
    }

    delete existingUser.password_hash

    req.session.user = existingUser

    res.status(200).send(req.session.user)
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('No session found')
    }
  }
}