import axios from 'axios'
import React, { useState } from 'react'

const TheaterThumb = (props) => {
  const [isConnected, setIsConnected] = useState(false)


  const handleConnectTheater = () => {
    const { theater_id } = props.theater
    axios.post(`/api/users/theaters/${theater_id}`)
      .then(setIsConnected(true))
      .catch(err => console.log(err))
    console.log('connected to theater')
  }

  const handleDisconnectTheater = () => {
    const { theater_id } = props.theater
    axios.delete(`api/users/theaters/${theater_id}`)
      .then(setIsConnected(false))
      .catch(err => console.log(err))
  }

  return (
    <div>
      {(isConnected) ?
        <button className='minus-button' onClick={() => { handleDisconnectTheater() }}> - </button> : null}
      {props.theater.theater_id}
      {props.theater.theater_name}
      {props.theater.theater_email}
      {(isConnected) ?
        null : <button className='plus-button' onClick={() => { handleConnectTheater() }}> + </button>}
    </div>
  )
}

export default TheaterThumb