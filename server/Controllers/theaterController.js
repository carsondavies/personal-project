const getMyAuditions = async (req, db) => {
  const { theater_id } = req.session.user
  const [myAuditions] = await db.get_theater_auditions([theater_id])
  return myAuditions
}


module.exports = {
  editTheaterInfo: async (req, res) => {
    const db = req.app.get('db')
    const { theater_id } = req.session.user
    const { theater_name, location, description, contact } = req.body

    const [updatedTheater] = await db.edit_theater([theater_name, location, description, contact, theater_id])
    console.log(updatedTheater)
    res.status(200).send(updatedTheater)
  },

  getTheaterAuditions: async (req, res) => {
    const db = req.app.get('db')
    const { theater_id } = req.params

    const [theaterAuditions] = await db.get_theater_auditions(theater_id)

    res.status(200).send(theaterAuditions)
  },
  //allows theater to post audition to db, connects via foreign key to theater.
  addAudition: async (req, res) => {
    const db = req.app.get('db')

    const { show, run_dates, pay_rate, rehearsal_dates, } = req.body

    const { theater_id } = req.session.user

    await db.auditions.add_audition([show, run_dates, pay_rate, rehearsal_dates, theater_id])

    const myAuditions = await getMyAuditions(db)

    res.status(200).send(myAuditions)
  },


  editAudition: async (req, res) => {
    const db = req.app.get('db')

    const { show, run_dates, pay_rate, rehearsal_dates } = req.body

    const { audition_id } = req.params
    console.log(show, run_dates, pay_rate, rehearsal_dates, audition_id)
    // const {theater_id} = req.session.user

    await db.auditions.edit_audition([show, run_dates, pay_rate, rehearsal_dates, audition_id])

    const myAuditions = await getMyAuditions(db)
    res.status(200).send(myAuditions)
  },

  deleteAudition: async (req, res) => {
    const db = req.app.get('db')

    const { audition_id } = req.params

    await db.auditions.delete_audition([audition_id])

    const myAuditions = await getMyAuditions(db)
    res.status(200).send(myAuditions)
  }
}