import React, { useState, useEffect } from 'react'
import VideoPlayer from './Videos/VideoPlayer'
import axios from 'axios'

const ResourceBrowser = () => {
  const [allVideos, setAllVideos] = useState([])
  const [currentVideo, setCurrentVideo] = useState('')


  useEffect(() => {
    getAllVideos()
  }, [])

  const getAllVideos = () => {
    axios.get('/api/videos')
      .then(res => setAllVideos(res.data))
      .catch(err => console.log(err))
  }

  const rangeVideos = async (vocal_range) => {
    const videos = await axios.get('/api/videos')
    const specificVideos = videos.data.filter(video => {
      if (video.vocal_range === vocal_range) {
        return true
      }
    })
    setAllVideos(specificVideos)
  }



  function YouTubeGetID(url) {
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
      <p onClick={() => { rangeVideos('bass') }}>Bass</p>
      <p onClick={() => { rangeVideos('tenor') }}>Tenor</p>
      <p onClick={() => { rangeVideos('alto') }}>Alto</p>
      <p onClick={() => { rangeVideos('Soprano') }}>Soprano</p>
      <p onClick={() => { getAllVideos() }}>All</p>
      <VideoPlayer currentVideo={currentVideo} />
      {allVideos.map(video => {
        return <p onClick={() => {
          setCurrentVideo(YouTubeGetID(video.video_url))
        }}>
          {video.video_url}
        </p>
      })}
    </div>

  )
}

export default ResourceBrowser