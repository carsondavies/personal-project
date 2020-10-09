import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import AuditionThumb from '../AuditionThumb'


const ActorAuditions = (props) => {
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
    <div className='profile-container'>
      {props.user.isLoggedIn ? <div className='audition-container'>
        {userAuditions.map((audition) => {
          return (
            <AuditionThumb
              key={audition.id}
              audition={audition}
              getUserAuditions={getUserAuditions}
              actorAuditions={true} />
          )
        })}
      </div> : <div>Please log in to view your connected auditions!</div>
      }
    </div>

  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(ActorAuditions)