import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import TheaterThumb from '../TheaterThumb'

const ActorTheaters = (props) => {

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
    <div className='profile-container'>
      {props.user.isLoggedIn ?
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
        :
        <div>Please log in to view your connected theaters!</div>
      }
    </div>

  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(ActorTheaters)