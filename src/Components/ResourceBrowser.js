import React, { useState, useEffect } from 'react'
import axios from 'axios'
import VideoPlayer from './Videos/VideoPlayer'
import AllVideos from './Videos/AllVideos'
import BassVideos from './Videos/BassVideos'
import TenorVideos from './Videos/TenorVideos'
import AltoVideos from './Videos/AltoVideos'
import SopranoVideos from './Videos/SopranoVideos'
import { connect } from 'react-redux'
import { getVideos } from '../dux/videoReducer'
import {getUser} from '../dux/userReducer.js'

const ResourceBrowser = (props) => {
  const [videos, setVideos] = useState([])
  const [currentVideo, setCurrentVideo] = useState('')
  const [tab, setTab] = useState(0)
  const [vocal_range, setVocalRange] = useState('')
  const [state, setState] = useState({
    video_title: '',
    video_url: ''
  })

  const {video_title, video_url} = state



  useEffect(() => {
    console.log('hit useeffect')
    props.getVideos()
    props.getUser()
  }, [])

  useEffect(() => {
    console.log('hit useeffect 2')
    rangeVideos('all')
  }, [props.videos])



  const rangeVideos = async (vocal_range) => {
    if (vocal_range !== 'all') {
      // console.log(vocal_range)
      const specificVideos = await props.videos.videos.filter(video => {
        if (video.vocal_range === vocal_range) {
          return true
        }
      })
      setVideos(specificVideos)
    }
    else {
      // console.log(props.videos.videos, 'hit else')
      setVideos(props.videos.videos)
    }
    if (vocal_range === 'bass') {
      setTab(1)
    }
    if (vocal_range === 'tenor') {
      setTab(2)
    }
    if (vocal_range === 'alto') {
      setTab(3)
    }
    if (vocal_range === 'soprano') {
      setTab(4)
    }
    if (vocal_range === 'all') {
      setTab(0)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setState(state => ({...state, [name]: value}))
  }

  const addVideo = () => {
    console.log('add video hit')
    axios.post(`/api/videos/${video_title}/${vocal_range}`, {video_url})
        .then(res => {console.log(res)})
        .catch(err => {console.log(err)})
    props.getVideos()
    rangeVideos('all')
    console.log('get videos hit again')
    setState({
      video_title: '',
      video_url: ''
    })
    setVocalRange('')
  }

  return (
    <div className='rb-view'>
      <div className='tab-container'>
        <button onClick={() => { rangeVideos('bass') }}>Bass</button>
        <button onClick={() => { rangeVideos('tenor') }}>Tenor</button>
        <button onClick={() => { rangeVideos('alto') }}>Alto</button>
        <button onClick={() => { rangeVideos('soprano') }}>Soprano</button>
        <button onClick={() => { rangeVideos('all') }}>All</button>
      </div>
      <div className='resource-container'>

          <div className='resource-left-side'>
            <div className='video-player'>
          <VideoPlayer currentVideo={currentVideo} />
          </div>
          <p>Add a video to our database here!</p>
          <p>*NOTE: You must be logged in to add a video*</p>
          <span>Video Title:
          <input
          type='text'
          name='video_title'
          value={video_title}
          onChange={handleChange}
          placeholder='enter video title'
          />
          </span>
          <span>Video URL:
          <input
          type='text'
          name='video_url'
          value={video_url}
          onChange={handleChange}
          placeholder='paste URL here'
          />
          </span>
          <select className='range-select' name='vocal_range' onChange={(e) => setVocalRange(e.target.value)}>
          <option value='1'>Select a vocal range</option>
          <option value='soprano'>Soprano</option>
          <option value='alto'>Alto</option>
          <option value='tenor'>Tenor</option>
          <option value='bass'>Bass</option>
          </select>
          <form action="">
            <button onClick={addVideo}>Submit Video</button>
          </form>
          </div>


        <div className='video-thumbnail-container'>
          {tab === 0 ? <AllVideos
          className='video-thumbnail-container'
          allVideos={videos}
          setCurrentVideo={setCurrentVideo} /> : null}
          {tab === 1 ? <BassVideos
          className='video-thumbnail-container'
          bassVideos={videos}
          setCurrentVideo={setCurrentVideo} /> : null}
          {tab === 2 ? <TenorVideos
          className='video-thumbnail-container'
          tenorVideos={videos}
          setCurrentVideo={setCurrentVideo} /> : null}
          {tab === 3 ? <AltoVideos
          className='video-thumbnail-container'
          altoVideos={videos}
          setCurrentVideo={setCurrentVideo} /> : null}
          {tab === 4 ? <SopranoVideos
          className='video-thumbnail-container'
          sopranoVideos={videos}
          setCurrentVideo={setCurrentVideo} /> : null}</div>
      </div>
    </div>

  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getVideos, getUser })(ResourceBrowser)