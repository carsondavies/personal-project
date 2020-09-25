

module.exports = {
  editUser: async (req, res) => {
    const db = req.app.get('db')

    const { first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range } = req.body

    const { id } = req.session.user

    const [updatedUser] = await db.edit_user([first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range, id])

    res.status(200).send(updatedUser)
  }
}