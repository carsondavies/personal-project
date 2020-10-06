import React, { useState, useEffect } from 'react'
import VideoPlayer from './Videos/VideoPlayer'
import AllVideos from './Videos/AllVideos'
import BassVideos from './Videos/BassVideos'
import TenorVideos from './Videos/TenorVideos'
import AltoVideos from './Videos/AltoVideos'
import SopranoVideos from './Videos/SopranoVideos'
import { connect } from 'react-redux'
import { getVideos } from '../dux/videoReducer'

const ResourceBrowser = (props) => {
  const [videos, setVideos] = useState([])
  const [currentVideo, setCurrentVideo] = useState('')
  const [tab, setTab] = useState(0)



  useEffect(() => {
    console.log('hit useeffect')
    props.getVideos()
  }, [])

  useEffect(() => {
    rangeVideos('all')
  }, [props.videos])



  const rangeVideos = async (vocal_range) => {
    console.log(vocal_range, props)
    if (vocal_range !== 'all') {
      console.log(vocal_range)
      const specificVideos = await props.videos.videos.filter(video => {
        if (video.vocal_range === vocal_range) {
          return true
        }
      })
      setVideos(specificVideos)
    }
    else {
      console.log(props.videos.videos, 'hit else')
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

  // console.log(videos)

  return (
    <div>
      <button onClick={() => { rangeVideos('bass') }}>Bass</button>
      <button onClick={() => { rangeVideos('tenor') }}>Tenor</button>
      <button onClick={() => { rangeVideos('alto') }}>Alto</button>
      <button onClick={() => { rangeVideos('soprano') }}>Soprano</button>
      <button onClick={() => { rangeVideos('all') }}>All</button>

      <VideoPlayer currentVideo={currentVideo} />

      {tab === 0 ? <AllVideos
        allVideos={videos}
        setCurrentVideo={setCurrentVideo} /> : null}
      {tab === 1 ? <BassVideos
        bassVideos={videos}
        setCurrentVideo={setCurrentVideo} /> : null}
      {tab === 2 ? <TenorVideos
        tenorVideos={videos}
        setCurrentVideo={setCurrentVideo} /> : null}
      {tab === 3 ? <AltoVideos
        altoVideos={videos}
        setCurrentVideo={setCurrentVideo} /> : null}
      {tab === 4 ? <SopranoVideos
        sopranoVideos={videos}
        setCurrentVideo={setCurrentVideo} /> : null}
    </div>

  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getVideos })(ResourceBrowser)