const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

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
    // console.log(req.session.user)
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
  },

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
  },

  email: async (req, res) => {
    const { EMAIL, PASSWORD } = process.env
    const { email, first_name } = req.body

    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      })
      let info = await transporter.sendMail({
        from: `${EMAIL}`,
        to: email,
        subject: `Welcome to TheaterLink ${first_name}!`,
        text: `Thank you for joining TheaterLink ${first_name}! We hope you book the gig! Feel free to update your profile information so Theaters can get to know you!`
      }, (err, res) => {
        if (err) {
          console.log('err', err)
        } else {
          console.log('email sent', res)
          res.status(200).send(info)
        }
      })
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }
}