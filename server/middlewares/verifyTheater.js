module.exports = (req, res, next) => {
  console.log(req.session.user)
  if (req.session.user && req.session.user.verified) {
    next()
  } else {
    res.status(403).send('You must be a registered theater to perform this action')
  }
}