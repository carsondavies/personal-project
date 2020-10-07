import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TheaterThumb from '../TheaterThumb'

const ActorTheaters = () => {

  const [userTheaters, setUserTheaters] = useState([])

  useEffect(() => {
    getUserTheaters()
  }, [])

  const getUserTheaters = () => {
    axios.get('/api/users/usertheaters')
      .then(res => setUserTheaters(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div className='theater-container'>
      {userTheaters.map(theater => {
        return (
          <TheaterThumb
            key={theater.theater_id}
            theater={theater}
            getUserTheaters={getUserTheaters}
            actorTheaters={true} />
        )
      })}
    </div>
  )
}

export default ActorTheaters