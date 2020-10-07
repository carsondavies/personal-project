import React from 'react'
import { connect } from 'react-redux'
import { connectTheater, disconnectTheater } from '../dux/theaterReducer'


const TheaterThumb = (props) => {


  const handleDisconnect = () => {
    props.disconnectTheater(props.theater.theater_id)
    props.getUserTheaters()
  }

  return (
    <div className='thumbnail-container'>
      {(props.actorTheaters) ?
        <button className='minus-button' onClick={() => { handleDisconnect() }}> - </button> : null}

      <p>{props.theater.theater_id}</p>
      <p>{props.theater.theater_name}</p>
      <p>{props.theater.theater_email}</p>

      {(props.generalTheaters) ?
        <button className='plus-button' onClick={() => { props.connectTheater(props.theater.theater_id) }}> + </button> : null}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { disconnectTheater, connectTheater })(TheaterThumb)