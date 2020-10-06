import React from 'react'
import Thumbnail from './Thumbnail'
// import YouTubeGetID from '../YouTubeGetID'


const AllVideos = (props) => {

  // console.log(props)

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
      {props.allVideos.map(video => {
        return <div onClick={() => {
          props.setCurrentVideo(YouTubeGetID(video.video_url))
        }} >
          <Thumbnail
            key={video.video_id}
            generalVideos={true}
            video={video}
          />
        </div>
      })}
    </div>
  )
}

export default AllVideos