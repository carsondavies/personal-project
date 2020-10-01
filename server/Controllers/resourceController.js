module.exports = {
  addVideoToBass: async (req, res) => {
    //will be an input field for users to paste link to add video to db.
    const db = req.app.get('db')

    const { video_url } = req.body

    const [video] = await db.videoQueries.check_bass_video([video_url])

    if (video) {
      return res.status(409).send('Video already in bass database')
    } else {
      await db.videoQueries.add_bass_video([video_url])
      res.status(200).send('Video added to bass database')
    }
  },

  addVideoToTenor: async (req, res) => {
    //will be an input field for users to paste link to add video to db.
    const db = req.app.get('db')

    const { video_url } = req.body

    const [video] = await db.videoQueries.check_tenor_video([video_url])

    if (video) {
      return res.status(409).send('Video already in tenor database')
    } else {
      await db.videoQueries.add_tenor_video([video_url])
      res.status(200).send('Video added to tenor database')
    }
  },

  addVideoToAlto: async (req, res) => {
    //will be an input field for users to paste link to add video to db.
    const db = req.app.get('db')

    const { video_url } = req.body

    const [video] = await db.videoQueries.check_alto_video([video_url])

    if (video) {
      return res.status(409).send('Video already in alto database')
    } else {
      await db.videoQueries.add_alto_video([video_url])
      res.status(200).send('Video added to alto database')
    }
  },

  addVideoToSoprano: async (req, res) => {
    //will be an input field for users to paste link to add video to db.
    const db = req.app.get('db')

    const { video_url } = req.body

    const [video] = await db.videoQueries.check_soprano_video([video_url])

    if (video) {
      return res.status(409).send('Video already in soprano database')
    } else {
      await db.videoQueries.add_soprano_video([video_url])
      res.status(200).send('Video added to soprano database')
    }
  }
}