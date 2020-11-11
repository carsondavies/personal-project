// import React from 'react'
// import Youtube from 'react-youtube'


// const VideoPlayer = () => {

//   const opts = {
//     height: '390',
//     width: '640',
//     playerVars: {
//       autoplay: 1,
//     }
//   }

//   return (
//     <Youtube videoId='2g811Eo7K8U' opts={opts} onReady={_onReady} />
//   )
//   _onReady(event) {
//     event.target.pauseVideo()
//   }
// }


// export default VideoPlayer

import React from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component {
  render() {
    const opts = {
      height: '340vh',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return <YouTube videoId={this.props.currentVideo} opts={opts} onReady={this._onReady} />;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default VideoPlayer