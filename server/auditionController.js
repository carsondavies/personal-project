const getAllAuditions = async (db) => {
  const auditions = await db.auditions.get_auditions()
  return auditions
}

module.exports = {
  getAuditions: async (req, res) => {
    const db = req.app.get('db')
    const auditions = await getAllAuditions(db)
    res.status(200).send(auditions)
  },
  //allows theater to post audition to db, connects via foreign key to theater.
  addAudition: async (req, res) => {
    const db = req.app.get('db')

    const { show, run_dates, pay_rate, rehearsal_dates, } = req.body

    const { theater_id } = req.session.user

    const [newAudition] = await db.auditions.add_audition([show, run_dates, pay_rate, rehearsal_dates, theater_id])

    res.status(200).send(newAudition)
  },


  editAudition: async (req, res) => {
    const db = req.app.get('db')

    const { show, run_dates, pay_rate, rehearsal_dates } = req.body

    const { audition_id } = req.params
    console.log(show, run_dates, pay_rate, rehearsal_dates, audition_id)
    // const {theater_id} = req.session.user

    await db.auditions.edit_audition([show, run_dates, pay_rate, rehearsal_dates, audition_id])

    const auditions = await getAllAuditions(db)
    res.status(200).send(auditions)
  },

  deleteAudition: async (req, res) => {
    const db = req.app.get('db')

    const { audition_id } = req.params

    await db.auditions.delete_audition([audition_id])

    const auditions = await getAllAuditions(db)
    res.status(200).send(auditions)
  }
}