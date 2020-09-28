module.exports = {
  addVideoToBass: async (req, res) => {
    //will be an input field for users to paste link to add video to db.
    const db = req.app.get('db')

    const { videoURL } = req.body

    const [video] = await db.check_bass_video([videoURL])

    if (video) {
      return res.status(409).send('Video already in database')
    } else {
      await db.add_bass_video([videoURL])
      res.status(200).send('Video added to database')
    }
  },

  addVideoToTenor: async (req, res) => {
    //will be an input field for users to paste link to add video to db.
    const db = req.app.get('db')

    const { videoURL } = req.body

    const [video] = await db.check_tenor_video([videoURL])

    if (video) {
      return res.status(409).send('Video already in database')
    } else {
      await db.add_tenor_video([videoURL])
      res.status(200).send('Video added to database')
    }
  },

  addVideoToAlto: async (req, res) => {
    //will be an input field for users to paste link to add video to db.
    const db = req.app.get('db')

    const { videoURL } = req.body

    const [video] = await db.check_alto_video([videoURL])

    if (video) {
      return res.status(409).send('Video already in database')
    } else {
      await db.add_alto_video([videoURL])
      res.status(200).send('Video added to database')
    }
  },

  addVideoToSoprano: async (req, res) => {
    //will be an input field for users to paste link to add video to db.
    const db = req.app.get('db')

    const { videoURL } = req.body

    const [video] = await db.check_soprano_video([videoURL])

    if (video) {
      return res.status(409).send('Video already in database')
    } else {
      await db.add_soprano_video([videoURL])
      res.status(200).send('Video added to database')
    }
  }
}