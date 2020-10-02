import axios from 'axios'
import React, { useState } from 'react'

const AuditionThumb = (props) => {
  const [isConnected, setIsConnected] = useState(false)

  const handleConnectAudition = () => {
    const { theater_id, id } = props.audition
    axios.post(`/api/users/${id}/${theater_id}`)
      .then(setIsConnected(true))
      .catch(err => console.log(err))
    console.log('connected to audition')
  }

  const handleDisconnectAudition = () => {
    const { theater_id } = props.audition
    axios.delete(`/api/users/${theater_id}`)
      .then(setIsConnected(false))
      .catch(err => console.log(err))
    console.log('disconnected from audition')
  }

  return (
    <div>
      {(isConnected) ?
        <button className='minus-button' onClick={() => { handleDisconnectAudition() }}> - </button> : null}
      {props.audition.id}
      {props.audition.show}
      {(isConnected) ?
        null : <button className='plus-button' onClick={() => { handleConnectAudition() }}> + </button>}
    </div>
  )
}

export default AuditionThumb