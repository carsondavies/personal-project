const YouTubeGetID = (url) => {
  var ID = '';
  url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
  return ID;
}

module.exports = {
  addVideo: async (req, res) => {
    const db = req.app.get('db')
    const {video_url, video_title, vocal_range} = req.params

    const videoId = YouTubeGetID(video_url)

    const [video] = await db.videoQueries.check_video([video_url])

    if (video) {
      return res.status(409).send('Video already in database')
    } else {
      await db.videoQueries.add_video([vocal_range, video_url, video_title, `https://img.youtube.com/vi/${videoId}/default.jpg`])
      res.status(200).send('Video added to Resource Browser. Thank you for your contribution!')
    }


  },
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