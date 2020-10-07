import React from 'react'
import { connect } from 'react-redux'
import { connectAudition, disconnectAudition } from '../dux/auditionReducer'

const AuditionThumb = (props) => {


  const handleDisconnect = () => {
    props.disconnectAudition(props.audition.theater_id, props.audition.id)
    props.getUserAuditions()
  }

  // console.log(props)
  return (
    <div className='thumbnail-container'>
      {(props.actorAuditions) ?
        <button className='minus-button' onClick={() => { handleDisconnect() }}> - </button> : null}

      <p>{props.audition.id}</p>
      <p>{props.audition.show}</p>

      {(props.generalAuditions) ?
        <button className='plus-button' onClick={() => { props.connectAudition(props.audition.id, props.audition.theater_id) }}> + </button> : null}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { disconnectAudition, connectAudition })(AuditionThumb)