import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AuditionThumb from './AuditionThumb'

const Auditions = () => {
  const [auditions, setAuditions] = useState([])

  useEffect(() => {
    getAuditions()
  }, [])

  const getAuditions = () => {
    axios.get('/api/auditions')
      .then(res => setAuditions(res.data))
      .catch(err => alert(err))
  }

  return (
    <div>
      {auditions.map((audition, index) => {
        return (
          <AuditionThumb key={index} audition={audition} getAuditions={getAuditions} />
        )
      })}
    </div>
  )
}

export default Auditions