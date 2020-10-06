import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AuditionThumb from '../AuditionThumb'


const ActorAuditions = () => {
  const [userAuditions, setUserAuditions] = useState([])

  useEffect(() => {
    getUserAuditions()
  }, [])

  const getUserAuditions = () => {
    axios.get('/api/users/userauditions')
      .then(res => setUserAuditions(res.data))
      .catch(err => console.log(err))
  }

  // console.log(userAuditions)

  return (
    <div>
      {userAuditions.map((audition) => {
        return (
          <AuditionThumb
            key={audition.id}
            audition={audition}
            getUserAuditions={getUserAuditions}
            actorAuditions={true} />
        )
      })}
    </div>
  )
}

export default ActorAuditions