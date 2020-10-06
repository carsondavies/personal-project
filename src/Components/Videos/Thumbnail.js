import React from 'react'
import { connect } from 'react-redux'
import { connectVideo, disconnectVideo } from '../../dux/videoReducer'


const Thumbnail = (props) => {



  const handleDisconnect = () => {
    props.disconnectVideo(props.video.video_id)
    props.getUserVideos()
  }

  return (
    <div>
      {(props.actorVideos) ?
        <button className='minus-button' onClick={() => { handleDisconnect() }} > - </button> : null}


      <div>
        {props.video.video_title}
      </div>
      <img className='video-thumbnail' src={props.video.thumbnail} alt={'video thumbnail'} />

      {(props.generalVideos) ?
        <button className='minus-button' onClick={() => {
          connectVideo(props.video.video_id)
        }} > + </button> : null}

    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { disconnectVideo, connectVideo })(Thumbnail)

