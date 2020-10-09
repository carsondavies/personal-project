import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Thumbnail from '../Videos/Thumbnail'
import VideoPlayer from '../Videos/VideoPlayer'


const ActorResources = (props) => {
  const [userVideos, setUserVideos] = useState([])
  const [currentVideo, setCurrentVideo] = useState('')

  useEffect(() => {
    getUserVideos()
  }, [])

  const getUserVideos = () => {
    axios.get('/api/users/uservideos')
      .then(res => setUserVideos(res.data))
      .catch(err => console.log(err))
  }

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

  return (
    <div>
      {props.user.isLoggedIn ?
        <div className='profile-container'>
          <div className='video-player'>
            <VideoPlayer currentVideo={currentVideo} />
          </div>

          <div className='video-thumbnail-container'>
            {userVideos.map((video) => {
              return <div onClick={() => {
                setCurrentVideo(YouTubeGetID(video.video_url))
              }}>
                <Thumbnail
                  key={video.video_id}
                  video={video}
                  getUserVideos={getUserVideos}
                  actorVideos={true} />
              </div>
            })}
          </div>
        </div>
        :
        <div>Please log in to view your connected videos!</div>
      }
    </div>

  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(ActorResources)