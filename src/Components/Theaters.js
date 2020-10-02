import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TheaterThumb from './TheaterThumb'

const Theaters = () => {
  const [theaters, setTheaters] = useState([])

  useEffect(() => {
    getTheaters()
  }, [])

  const getTheaters = () => {
    axios.get('/api/theaters')
      .then(res => setTheaters(res.data))
      .catch(err => alert(err))
  }

  return (
    <div>
      {theaters.map((theater, index) => {
        return (
          <TheaterThumb key={theater.theater_id} theater={theater} getTheaters={getTheaters} />
        )
      })}
    </div>
  )
}

export default Theaters